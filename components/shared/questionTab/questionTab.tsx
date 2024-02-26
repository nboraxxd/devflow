import { getUserQuestions } from '@/lib/actions/user.action'
import { QuestionCard } from '@/components/shared/cards'

export default async function QuestionTab({ userId }: { userId: string }) {
  const { questions, totalQuestions } = await getUserQuestions({ userId, page: 1 })

  return (
    <>
      {questions.map((question) => (
        <QuestionCard key={question._id.toString()} question={question} />
      ))}
    </>
  )
}
