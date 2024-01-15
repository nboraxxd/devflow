'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { QuestionsSchema } from '@/lib/validation'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LinkGradient } from '@/components/shared/button'

export default function Question() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  })

  // 2. Define a submit handler.
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
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem? <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>{/* TODO: Add an Editor component */}</FormControl>
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
