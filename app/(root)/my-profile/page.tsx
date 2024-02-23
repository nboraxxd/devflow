import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { PATH } from '@/constants/path'
import { ProfileTemplate } from '@/components/profile'

export default async function Page() {
  const { userId } = auth()

  if (!userId) redirect(PATH.SIGN_IN)

  return (
    <ProfileTemplate userId={userId}>
      <Link
        href={PATH.EDIT_PROFILE}
        className="paragraph-medium flex-center background-light800_dark400 text-dark300_light900 mt-3 min-h-[46px] min-w-[173px] rounded-lg border-light-b p-4 py-1 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Edit Profile
      </Link>
    </ProfileTemplate>
  )
}
