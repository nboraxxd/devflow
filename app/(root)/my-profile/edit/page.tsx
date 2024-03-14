import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'

import { getUserByClerkId } from '@/lib/actions/user.action'
import { MyProfile } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Edit Profile | Devflow',
  description:
    'Edit your profile and keep your information up to date. Devflow is a community of developers helping each other.',
}

export default async function Page() {
  const { userId: clerkId } = auth()

  if (!clerkId) {
    return null
  }

  const mongoUser = await getUserByClerkId(clerkId)

  return (
    <section className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Edit profile</h1>

      <div className="mt-4 md:mt-9">
        <MyProfile clerkId={clerkId} user={JSON.stringify(mongoUser)} />
      </div>
    </section>
  )
}
