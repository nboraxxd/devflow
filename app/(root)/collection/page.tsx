import { auth } from '@clerk/nextjs'

import { PATH } from '@/constants/path'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.action'
import { QuestionCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'

export default async function Page() {
  const { userId: clerkId } = auth()

  if (!clerkId) return null

  const { savedQuestions: questions } = await getSavedQuestions({ clerkId })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <FilterGroup inputPlacehoder="Search amazing minds here..." filters={QuestionFilters} />

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
            title="No saved questions found"
            description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
            link={PATH.HOMEPAGE}
            linkTitle="Explore Questions"
          />
        )}
      </section>
    </div>
  )
}
