'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from '@/types/user.types'
import { ServiceStatus } from '@/constants/enums'
import { PATH } from '@/constants/path'
import { MyProfileSchema } from '@/lib/validation'
import { updateUser } from '@/lib/actions/user.action'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { LinkGradient } from '@/components/shared/button'

interface Props {
  clerkId: string
  user: string
}

export default function MyProfile({ clerkId, user }: Props) {
  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)

  const router = useRouter()
  const pathname = usePathname()
  const parsedUser: User = JSON.parse(user)

  const form = useForm<z.infer<typeof MyProfileSchema>>({
    resolver: zodResolver(MyProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  })

  async function onSubmit(values: z.infer<typeof MyProfileSchema>) {
    const { name, username, portfolioWebsite, location, bio } = values

    try {
      setStatus(ServiceStatus.pending)

      await updateUser({
        clerkId,
        updateData: { name, username, portfolioWebsite, location, bio },
        path: pathname,
      })

      setStatus(ServiceStatus.successful)
      router.push(PATH.MY_PROFILE)
    } catch (error) {
      setStatus(ServiceStatus.rejected)
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Full name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Bruce Wayne"
                  className="background-light850_dark300 placeholder mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="BruceWayneDC"
                  className="background-light850_dark300 placeholder mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Portfolio URL */}
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.brucewayne.dc"
                  className="background-light850_dark300 placeholder mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location <span className="text-primary-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="1007 Mountain Drive, Gotham"
                  className="background-light850_dark300 placeholder mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <div className="grid w-full gap-1.5">
              <FormItem>
                <FormLabel>
                  Bio <span className="text-primary-700">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I'm not Batman"
                    className="background-light850_dark300 placeholder mt-3 h-auto border-light-700 px-4 py-3 dark:border-dark-400 md:px-6 md:py-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-1 text-sm font-medium italic text-primary-700" />
              </FormItem>
            </div>
          )}
        />

        {/* Submit */}
        <LinkGradient
          className="ml-auto flex min-w-[173px] justify-center"
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={status === ServiceStatus.pending}
        >
          {status === ServiceStatus.pending && (
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-light-900" />
          )}
          {status === ServiceStatus.pending ? 'Submitting...' : 'Submit'}
        </LinkGradient>
      </form>
    </Form>
  )
}
