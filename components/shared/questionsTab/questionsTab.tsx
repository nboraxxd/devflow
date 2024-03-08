import { PATH } from '@/constants/path'
import { getUserQuestions } from '@/lib/actions/user.action'
import { QuestionCard } from '@/components/shared/cards'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

export default async function QuestionsTab({ userId, pageNumber }: { userId: string; pageNumber: number }) {
  const { questions, isNext } = await getUserQuestions({ userId, page: pageNumber, pageSize: 5 })

  return (
    <>
      {questions.length > 0 ? (
        questions.map((question) => <QuestionCard key={question._id.toString()} question={question} />)
      ) : (
        <NoResult
          title="There's no question to show"
          description="Be the first to break the silence! 🚀 Ask a question and kickstart the discussion. Our query could be the
      next big thing others learn from. Get involved! 💡"
          link={PATH.ASK_QUESTION}
          linkTitle="Ask a Question"
        />
      )}

      {questions.length > 0 && <Pagination isNext={isNext} pageNumber={pageNumber} />}
    </>
  )
}
