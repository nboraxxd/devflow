'use client'

import * as z from 'zod'
import { KeyboardEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from 'next-themes'

import { envConfig } from '@/constants/config'
import { PATH } from '@/constants/path'
import { editorOptions } from '@/constants'
import { ServiceStatus, QuestionFormType } from '@/constants/enums'
import { QuestionSchema } from '@/lib/validation'
import { GetQuestionByIdReturn, createQuestion, updateQuestion } from '@/lib/actions/question.actions'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LinkGradient, PrimaryButton } from '@/components/shared/button'

type TagsField = ControllerRenderProps<z.infer<typeof QuestionSchema>, 'tags'>

type Props = {
  mongoUserId: string
  type: QuestionFormType
  question?: string
}

export default function Question({ mongoUserId, type, question }: Props) {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const router = useRouter()
  const pathname = usePathname()

  const { resolvedTheme } = useTheme()
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const parsedQuestion: GetQuestionByIdReturn | null = question ? JSON.parse(question) : null
  const groupedTags = parsedQuestion?.tags.map((tag) => tag.name)

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parsedQuestion?.title || '',
      content: parsedQuestion?.content || '',
      tags: groupedTags || [],
    },
  })

  function handleSubmitTag(e: KeyboardEvent<HTMLInputElement>, field: TagsField) {
    const tagsInput = e.target as HTMLInputElement
    const tagValue = tagsInput.value.trim()

    if (e.key === 'Enter' || e.key === ' ') {
      if (tagValue.length < 1) {
        return form.setError('tags', {
          type: 'min',
          message: 'Tag must be at least 1 character long.',
        })
      }

      if (tagValue.length > 15) {
        return form.setError('tags', {
          type: 'max',
          message: 'Tag cannot be longer than 15 characters.',
        })
      }

      if (tagValue.includes(' ')) {
        return form.setError('tags', {
          type: 'pattern',
          message: 'Tag cannot contain spaces.',
        })
      }

      if (!field.value.map((t) => t.toLowerCase()).includes(tagValue.toLowerCase())) {
        field.onChange([...field.value, tagValue.toLowerCase()])
        // or using: form.setValue('tags', [...field.value, tagValue.toLowerCase()])
        tagsInput.value = ''

        form.clearErrors('tags')
      }
    }
  }

  function handleDeteleTag(tag: string, field: TagsField) {
    field.onChange(field.value.filter((t) => t !== tag))
    // or using: form.setValue('tags', field.value.filter((t) => t !== tag))
  }

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    const { content, tags, title } = values

    try {
      if (type === QuestionFormType.create) {
        setStatus(ServiceStatus.pending)
        await createQuestion({ content, tags, title, path: pathname, author: mongoUserId })
        setStatus(ServiceStatus.successful)
        router.push(PATH.HOMEPAGE)
      } else {
        setStatus(ServiceStatus.pending)
        await updateQuestion({ content, questionId: parsedQuestion!._id.toString(), title, path: pathname })
        router.push(`${PATH.QUESTIONS}/${parsedQuestion?._id}`)
      }
    } catch (error) {
      setStatus(ServiceStatus.rejected)
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-9">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="background-light850_dark300 mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another person.
              </FormDescription>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 mb-3">
                Detailed explanation of your problem? <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  key={resolvedTheme}
                  apiKey={envConfig.tinyEditorApiKey}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content: string) => field.onChange(content)}
                  {...editorOptions(resolvedTheme, parsedQuestion?.content || '')}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
              </FormDescription>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    className="background-light850_dark300 mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                    onKeyDown={(e) => handleSubmitTag(e, field)}
                    placeholder="Press Enter or Spacebar to add tag"
                    disabled={type === QuestionFormType.edit}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {field.value.map((tag) => (
                        <div
                          key={tag}
                          className="flex-center background-light800_dark400 text-light400_light500 subtle-medium relative min-h-[29px] rounded-md px-4 py-1 uppercase transition-all duration-300 hover:!bg-light-700 hover:dark:!bg-dark-500"
                        >
                          <span className="text-dark500_light800">{tag}</span>
                          {type !== QuestionFormType.edit && (
                            <PrimaryButton
                              type="button"
                              className="absolute right-0 top-0 z-50 -translate-y-1/3 translate-x-1/3 rounded-full bg-dark-500 p-[1px] dark:bg-light-800"
                              onClick={() => handleDeteleTag(tag, field)}
                            >
                              <Image
                                src="/assets/icons/close.svg"
                                alt="Close icon"
                                width={10}
                                height={10}
                                className="object-contain invert dark:invert-0"
                              />
                            </PrimaryButton>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 5 tags to describe what your question is about.
              </FormDescription>
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
          <span className="mt-1">
            {status === ServiceStatus.pending
              ? type === QuestionFormType.create
                ? 'Posting...'
                : 'Editing...'
              : type === QuestionFormType.create
              ? 'Ask a Question'
              : 'Edit Question'}
          </span>
        </LinkGradient>
      </form>
    </Form>
  )
}
