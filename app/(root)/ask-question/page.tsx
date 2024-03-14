import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { PATH } from '@/constants/path'
import { QuestionFormType } from '@/constants/enums'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { Question } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Ask a public question | Devflow',
  description: 'Ask a public question and get help from the community. Devflow is a community of developers helping each other.',
}

export default async function AskQuestionPage() {
  const { userId: clerkId } = auth()
  if (!clerkId) redirect(PATH.SIGN_IN)

  const mongoUser = await getUserByClerkId(clerkId)

  return (
    <section className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Ask a public quesiton</h1>

      <div className="mt-4 md:mt-9">
        <Question mongoUserId={mongoUser._id.toString()} type={QuestionFormType.create} />
      </div>
    </section>
  )
}
