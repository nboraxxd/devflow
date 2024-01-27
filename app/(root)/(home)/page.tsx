import { getQuestions } from '@/lib/actions/question.actions'
import { HomeFilters } from '@/components/home'
import { LinkGradient } from '@/components/shared/button'
import { QuestionCard } from '@/components/shared/cards'
import { NoResult } from '@/components/shared/noResult'

export default async function Home() {
  const { questions } = await getQuestions({})

  return (
    <div className="py-8 sm:py-16">
      <div className="flex flex-col-reverse items-start max-sm:gap-2 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <LinkGradient href="/ask-question" className="ml-auto">
          Ask a Question
        </LinkGradient>
      </div>

      <HomeFilters />

      <section className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={{
                _id: question._id,
                title: question.title,
                tags: question.tags,
                author: question.author,
                upvotes: question.upvotes,
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
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </div>
  )
}
