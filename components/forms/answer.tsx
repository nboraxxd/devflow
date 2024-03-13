'use client'

import Image from 'next/image'
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
import { createAnswer } from '@/lib/actions/answer.action'
import { GetQuestionByIdReturn } from '@/lib/actions/question.actions'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { LinkGradient, PrimaryButton } from '@/components/shared/button'

interface AnswerProps {
  mongoUserId?: string
  question: string
}

export default function Answer({ mongoUserId, question }: AnswerProps) {
  const parsedQuestion = JSON.parse(question) as GetQuestionByIdReturn

  const [submitAnswerStatus, setSubmitAnswerStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const [generateAnswerStatus, setGenerateAnswerStatus] = useState<ServiceStatus>(ServiceStatus.idle)

  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: '',
    },
  })

  async function generateAIAnswer() {
    if (!mongoUserId) return

    try {
      setGenerateAnswerStatus(ServiceStatus.pending)

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, {
        method: 'POST',
        body: JSON.stringify({ question }),
      })

      const aiAnswer = await response.json()

      console.log(aiAnswer.reply)
      setGenerateAnswerStatus(ServiceStatus.successful)
    } catch (error) {
      setGenerateAnswerStatus(ServiceStatus.rejected)
      console.log(error)
    }
  }

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    const { content } = values
    if (!mongoUserId) return

    try {
      setSubmitAnswerStatus(ServiceStatus.pending)

      await createAnswer({ content, author: mongoUserId, question: parsedQuestion._id.toString(), path: pathname })

      setSubmitAnswerStatus(ServiceStatus.successful)
      form.reset()
      if (editorRef.current) editorRef.current.setContent('')
    } catch (error) {
      setSubmitAnswerStatus(ServiceStatus.rejected)
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <p className="text-dark400_light800 paragraph-semibold">Write your answer here</p>
        <PrimaryButton
          className="light-border-2 background-light800_dark300 flex-center flex items-center gap-1.5 rounded-md border px-4 py-2.5"
          onClick={generateAIAnswer}
          disabled={generateAnswerStatus === ServiceStatus.pending}
        >
          <Image src="/assets/icons/stars.svg" alt="Stars" width={12} height={12} />
          <span className="primary-text-gradient small-medium mt-px">Generate AI Answer</span>
        </PrimaryButton>
      </div>

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
            disabled={submitAnswerStatus === ServiceStatus.pending}
          >
            {submitAnswerStatus === ServiceStatus.pending && (
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-light-900" />
            )}
            <span className="mt-1">{submitAnswerStatus === ServiceStatus.pending ? 'Posting...' : 'Post answer'}</span>
          </LinkGradient>
        </form>
      </Form>
    </>
  )
}
