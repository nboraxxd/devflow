import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'

import { SearchParamsProps } from '@/types'
import { PATH } from '@/constants/path'
import { getQuestions, getRecommendedQuestions } from '@/lib/actions/question.actions'
import { HomeFilters } from '@/components/home'
import { LinkGradient } from '@/components/shared/button'
import { QuestionCard } from '@/components/shared/cards'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

const PAGE_SIZE = 10

export const metadata: Metadata = {
  title: 'Home | Devflow',
  description: 'Devflow is a community of developers helping each other. Join us and ask your programming questions!',
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth()
  let result

  if (searchParams?.filter === 'recommended' && userId) {
    result = await getRecommendedQuestions({
      userId,
      searchQuery: searchParams.q,
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: PAGE_SIZE,
    })
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: PAGE_SIZE,
    })
  }

  return (
    <div className="py-8 md:py-16">
      <div className="flex flex-col-reverse items-start max-sm:gap-2 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <LinkGradient href={PATH.ASK_QUESTION} className="ml-auto">
          Ask a Question
        </LinkGradient>
      </div>

      <HomeFilters />

      <section className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the
            next big thing others learn from. Get involved! 💡"
            link={PATH.ASK_QUESTION}
            linkTitle="Ask a Question"
          />
        )}
      </section>

      {result.questions.length > 0 && (
        <Pagination isNext={result.isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />
      )}
    </div>
  )
}
