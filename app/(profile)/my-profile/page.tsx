import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { SearchParamsProps } from '@/types'
import { PATH } from '@/constants/path'
import { ProfileTemplate } from '@/components/profile'

export const metadata: Metadata = {
  title: 'My Profile | Devflow',
  description: 'Explore and update your profile. Devflow is a community of developers helping each other.',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { userId } = auth()

  if (!userId) redirect(PATH.SIGN_IN)

  return (
    <ProfileTemplate userId={userId} pageNumber={searchParams.page ? +searchParams.page : 1}>
      <div className="flex justify-end">
        <Link
          href={PATH.EDIT_PROFILE}
          className="paragraph-medium flex-center background-light800_dark400 text-dark300_light900 min-h-[46px] w-[173px] rounded-lg border-light-b p-4 py-1 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:mt-3"
        >
          Edit Profile
        </Link>
      </div>
    </ProfileTemplate>
  )
}
