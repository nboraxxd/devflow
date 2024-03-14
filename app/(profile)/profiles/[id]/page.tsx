import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'

import { URLProps } from '@/types'
import { ProfileTemplate } from '@/components/profile'
import { redirect } from 'next/navigation'
import { PATH } from '@/constants/path'

export const metadata: Metadata = {
  title: 'Profile | Devflow',
  description: 'Explore and discover profiles. Devflow is a community of developers helping each other.',
}

export default function Page({ params: { id: userId }, searchParams }: URLProps) {
  const { userId: clerkId } = auth()

  if (clerkId === userId) redirect(PATH.MY_PROFILE)

  return <ProfileTemplate userId={userId} pageNumber={searchParams.page ? +searchParams.page : 1} />
}
