import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs'

import { URLProps } from '@/types'
import { PATH } from '@/constants/path'
import { formatNumberToSocialStyle, getTimestamp } from '@/lib/utils'
import { getQuestionById } from '@/lib/actions/question.actions'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { Metric } from '@/components/shared/metric'
import { ParseHTML } from '@/components/shared/parseHTML'
import { SubjectTag } from '@/components/shared/button'
import { Answer } from '@/components/forms'
import { AnswerList } from '@/components/shared/answerList'
import { Author } from '@/components/shared/author'
import { Votes } from '@/components/shared/votes'

export const metadata: Metadata = {
  title: 'Question | Devflow',
  description: 'Get help from the community. Devflow is a community of developers helping each other.',
}

export default async function Page({ params, searchParams }: URLProps) {
  const { userId: clerkId } = auth()

  const question = await getQuestionById(params.id)
  const mongoUser = clerkId ? await getUserByClerkId(clerkId) : undefined

  return (
    <main className="py-8 md:py-16">
      <section className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <Author
          author={question.author}
          imageWidth={22}
          imageHeight={22}
          authorTag="h2"
          linkClassName="w-fit pr-2"
          imageClassName="mb-0"
          authorClassName="paragraph-semibold text-dark300_light700 mt-1"
        />

        <div className="flex justify-end">
          <Votes
            type="question"
            itemId={question._id.toString()}
            userId={mongoUser?._id.toString()}
            upvotes={question.upvotes.length}
            hasUpvoted={mongoUser?._id ? question.upvotes.includes(mongoUser._id) : false}
            downvotes={question.downvotes.length}
            hasDownvoted={mongoUser?._id ? question.downvotes.includes(mongoUser._id) : false}
            hasSaved={mongoUser?.saved.map((s) => s.toString()).includes(question._id.toString())}
          />
        </div>
      </section>

      <article className="mt-3.5">
        <h1 className="h2-semibold">{question.title}</h1>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Metric iconUrl="/assets/icons/clock.svg" alt="Clock" value={`Asked ${getTimestamp(question.createdAt)}`} />
          <div className="flex items-center gap-4 max-sm:justify-end">
            <Metric
              iconUrl="/assets/icons/message.svg"
              alt="Answers"
              value={formatNumberToSocialStyle(question.answers.length)}
              title="answer"
              titles="answers"
            />
            <Metric
              iconUrl="/assets/icons/eye.svg"
              alt="Views"
              value={formatNumberToSocialStyle(question.views)}
              title="view"
              titles="views"
            />
          </div>
        </div>

        <ParseHTML html={question.content} />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {question.tags.map((tag) => (
            <SubjectTag key={tag._id.toString()} href={`${PATH.TAGS}/${tag._id}`}>
              {tag.name}
            </SubjectTag>
          ))}
        </div>
      </article>

      <AnswerList
        mongoUserId={mongoUser?._id.toString()}
        questionId={question._id.toString()}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page ? +searchParams.page : 1}
        pageSize={20}
      />

      <div className="mt-8">
        <Answer mongoUserId={mongoUser?._id.toString()} question={JSON.stringify(question)} />
      </div>
    </main>
  )
}
