import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'

import { ParamsProps } from '@/types'
import { QuestionFormType } from '@/constants/enums'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { getQuestionById } from '@/lib/actions/question.actions'
import { Question } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Edit a question | Devflow',
  description: 'Edit a question. Devflow is a community of developers helping each other.',
}

export default async function Page({ params }: ParamsProps) {
  const { userId: clerkId } = auth()

  if (!clerkId) {
    return null
  }

  const mongoUser = await getUserByClerkId(clerkId)
  const question = await getQuestionById(params.id)

  return (
    <section className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>

      <div className="mt-4 md:mt-9">
        <Question
          mongoUserId={mongoUser._id.toString()}
          type={QuestionFormType.edit}
          question={JSON.stringify(question)}
        />
      </div>
    </section>
  )
}
