import { AnswerFilters } from '@/constants/filters'
import { getTimestamp } from '@/lib/utils'
import { getAnswers } from '@/lib/actions/answer.action'
import { Filter } from '@/components/shared/filter'
import { Author } from '@/components/shared/author'
import { ParseHTML } from '@/components/shared/parseHTML'
import { Votes } from '@/components/shared/votes'
import { Pagination } from '@/components/shared/pagination'

interface Props {
  mongoUserId?: string
  questionId: string
  totalAnswers: number
  page?: number
  pageSize?: number
  filter?: string
}

export default async function AnswerList({ mongoUserId, questionId, totalAnswers, page, pageSize, filter }: Props) {
  const { answers, isNext } = await getAnswers({ question: questionId, page, pageSize, filter })

  return (
    <section className="mt-9">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <p className="primary-text-gradient paragraph-medium">
          {totalAnswers} {totalAnswers > 1 ? 'answers' : 'answer'}
        </p>
        <Filter
          filters={AnswerFilters}
          containerClassName="block shrink-0"
          filterClassName="min-h-[36px] min-w-[200px] gap-1.5"
        />
      </div>

      {answers.map((answer) => (
        <div key={answer._id.toString()} id={answer._id.toString()} className="mt-5 scroll-mt-[88px] md:mt-8">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <div className="flex w-fit flex-col gap-1.5 sm:flex-row sm:items-center">
              <Author author={answer.author} authorClassName="body-medium text-dark400_light700" />
              <span className="mt-0.5 max-sm:hidden">•</span>
              <p className="small-regular text-dark400_light700 text-right sm:mt-0.5">
                Answered <span className="lowercase">{getTimestamp(answer.createdAt)}</span>
              </p>
            </div>

            <div className="flex justify-end">
              <Votes
                type="answer"
                itemId={answer._id.toString()}
                userId={mongoUserId}
                upvotes={answer.upvotes.length}
                hasUpvoted={answer.upvotes.includes(mongoUserId)}
                downvotes={answer.downvotes.length}
                hasDownvoted={answer.downvotes.includes(mongoUserId)}
              />
            </div>
          </div>

          <ParseHTML html={answer.content} />
        </div>
      ))}

      {answers.length > 0 && <Pagination isNext={isNext} pageNumber={page || 1} />}
    </section>
  )
}
