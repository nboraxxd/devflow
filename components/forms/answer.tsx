'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from 'next-themes'

import { envConfig } from '@/constants/config'
import { editorOptions } from '@/constants'
import { ServiceStatus } from '@/constants/enums'
import { AnswerSchema } from '@/lib/validation'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LinkGradient } from '@/components/shared/button'
import { createAnswer } from '@/lib/actions/answer.action'

interface AnswerProps {
  mongoUserId?: string
  questionId: string
}

export default function Answer({ mongoUserId, questionId }: AnswerProps) {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)

  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    const { content } = values
    if (!mongoUserId) return

    try {
      setStatus(ServiceStatus.pending)

      await createAnswer({ content, author: mongoUserId, question: questionId, path: pathname })

      setStatus(ServiceStatus.successful)
      form.reset()
      if (editorRef.current) editorRef.current.setContent('')
    } catch (error) {
      setStatus(ServiceStatus.rejected)
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form className="mt-6 flex w-full flex-col gap-6">
        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Editor
                  key={resolvedTheme}
                  apiKey={envConfig.tinyEditorApiKey}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content: string) => field.onChange(content)}
                  {...editorOptions(resolvedTheme)}
                />
              </FormControl>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <LinkGradient
          className="ml-auto gap-2"
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={status === ServiceStatus.pending}
        >
          {status === ServiceStatus.pending && (
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-light-900" />
          )}
          <span className="mt-1">{status === ServiceStatus.pending ? 'Posting...' : 'Post answer'}</span>
        </LinkGradient>
      </form>
    </Form>
  )
}
