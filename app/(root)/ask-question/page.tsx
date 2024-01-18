import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { PATH } from '@/constants/path'
import { getUserById } from '@/lib/actions/user.action'
import { Question } from '@/components/forms/question'

export default async function AskQuestionPage() {
  // const { userId } = auth()
  const userId = '65a92bd74b954f94ea1a37b2'

  if (!userId) redirect(PATH.SIGN_IN)

  const mongoUser = await getUserById({ clerkId: userId })

  console.log('🔥 ~ AskQuestionPage ~ mongoUser:', userId, mongoUser)

  return (
    <section className="py-8 sm:py-16">
      <h1 className="h1-bold text-dark100_light900">Ask a public quesiton</h1>

      <div className="mt-4 md:mt-9">
        <Question />
      </div>
    </section>
  )
}
