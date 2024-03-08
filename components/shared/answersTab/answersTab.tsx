import { PATH } from '@/constants/path'
import { getUserAnswers } from '@/lib/actions/user.action'
import AnswerCard from '@/components/shared/cards/answerCard'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

export default async function AnswersTab({ userId, pageNumber }: { userId: string; pageNumber: number }) {
  const { answers, isNext } = await getUserAnswers({ userId, page: pageNumber, pageSize: 5 })

  return (
    <>
      {answers.length > 0 ? (
        answers.map((answer) => <AnswerCard key={answer._id.toString()} answer={answer} />)
      ) : (
        <NoResult
          title="There's no answer to show"
          description="Be the first to break the silence! 🚀 Answer a question and kickstart the discussion. Our query could be the
      next big thing others learn from. Get involved! 💡"
          link={PATH.HOMEPAGE}
          linkTitle="Answer a question"
        />
      )}

      {answers.length > 0 && <Pagination isNext={isNext} pageNumber={pageNumber} />}
    </>
  )
}
