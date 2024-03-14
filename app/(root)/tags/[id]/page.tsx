import type { Metadata } from 'next'

import { URLProps } from '@/types'
import { PATH } from '@/constants/path'
import { TagFilters } from '@/constants/filters'
import { getQuestionsByTagId } from '@/lib/actions/tag.action'
import { capitalizeFirstLetter } from '@/lib/utils'
import { FilterGroup } from '@/components/shared/filter'
import { QuestionCard } from '@/components/shared/cards'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

export const metadata: Metadata = {
  title: 'Tags | Devflow',
  description: 'Explore and discover tags. Devflow is a community of developers helping each other.',
}

export default async function Page({ params, searchParams }: URLProps) {
  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5,
  })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">{capitalizeFirstLetter(tagTitle)}</h1>

      <FilterGroup inputPlacehoder="Search tag questions..." route={`${PATH.TAGS}/${params.id}`} filters={TagFilters} />

      <section className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id.toString()}
              question={{
                _id: question._id,
                title: question.title,
                tags: question.tags,
                author: question.author,
                upvotes: question.upvotes,
                downvotes: question.downvotes,
                views: question.views,
                answers: question.answers,
                createdAt: question.createdAt,
                updatedAt: question.updatedAt,
              }}
            />
          ))
        ) : (
          <NoResult
            title="There's no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the
      next big thing others learn from. Get involved! 💡"
            link={PATH.ASK_QUESTION}
            linkTitle="Ask a Question"
          />
        )}
      </section>

      {questions.length > 0 && <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={isNext} />}
    </div>
  )
}
