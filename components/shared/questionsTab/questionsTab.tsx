import { getUserQuestions } from '@/lib/actions/user.action'
import { QuestionCard } from '@/components/shared/cards'

export default async function QuestionsTab({ userId }: { userId: string }) {
  const { questions } = await getUserQuestions({ userId, page: 1 })

  return questions.map((question) => <QuestionCard key={question._id.toString()} question={question} />)
}
