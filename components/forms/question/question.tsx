'use client'

import { useRef } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Editor as TinyMCEEditor } from 'tinymce'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from 'next-themes'

import { envConfig } from '@/constants/config'
import { Theme } from '@/constants/enums'
import { QuestionsSchema } from '@/lib/validation'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LinkGradient } from '@/components/shared/button'

export default function Question() {
  const { resolvedTheme } = useTheme()
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
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
                  className="background-light800_dark300 mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
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

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 mb-3">
                Detailed explanation of your problem? <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={envConfig.tinyEditorApiKey}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=''
                  init={{
                    skin: resolvedTheme === Theme.LIGHT ? 'oxide' : 'oxide-dark',
                    content_css: resolvedTheme === Theme.LIGHT ? 'light' : 'dark',
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'codesample',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                    ],
                    toolbar:
                      'undo redo |' +
                      'codesample | bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist',
                    content_style: `body { font-family: Inter, font-size:14px; }`,
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
              </FormDescription>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="background-light800_dark300 mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        <LinkGradient className="ml-auto">Ask a Question</LinkGradient>
      </form>
    </Form>
  )
}
