import { getUserAnswers } from '@/lib/actions/user.action'
import AnswerCard from '@/components/shared/cards/answerCard'

export default async function AnswersTab({ userId }: { userId: string }) {
  const { answers } = await getUserAnswers({ userId, page: 1 })

  return answers.map((answer) => <AnswerCard key={answer._id.toString()} answer={answer} />)
}
