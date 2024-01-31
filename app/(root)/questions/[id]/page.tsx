import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'

import { PATH } from '@/constants/path'
import { formatNumberToSocialStyle, getTimestamp } from '@/lib/utils'
import { getQuestionById } from '@/lib/actions/question.actions'
import { Metric } from '@/components/shared/metric'
import { ParseHTML } from '@/components/shared/parseHTML'
import { PrimaryButton, SubjectTag } from '@/components/shared/button'
import { Answer } from '@/components/forms'
import { getUserByClerkId } from '@/lib/actions/user.action'

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getQuestionById(params.id)
  const { userId: clerkId } = auth()

  let mongoUser
  if (clerkId) {
    mongoUser = await getUserByClerkId(clerkId)
  }

  return (
    <main className="py-8 md:py-16">
      <section className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <Link href={`${PATH.USERS}/${result.author.clerkId}`} className="flex items-center gap-1.5">
          <Image src={result.author.picture} alt={result.author.name} width={22} height={22} className="rounded-full" />
          <h2 className="paragraph-semibold text-dark300_light700 mt-1">{result.author.name}</h2>
        </Link>

        <div className="flex justify-end">Voting</div>
      </section>

      <article className="mt-3.5">
        <h1 className="h2-semibold">{result.title}</h1>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Metric iconUrl="/assets/icons/clock.svg" alt="Clock" value={`Asked ${getTimestamp(result.createdAt)}`} />
          <div className="flex items-center gap-4 max-sm:justify-end">
            <Metric
              iconUrl="/assets/icons/message.svg"
              alt="Answers"
              value={formatNumberToSocialStyle(8746)}
              title="answer"
              titles="answers"
            />
            <Metric
              iconUrl="/assets/icons/eye.svg"
              alt="Views"
              value={formatNumberToSocialStyle(412844)}
              title="view"
              titles="views"
            />
          </div>
        </div>

        <ParseHTML html={result.content} />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {result.tags.map((tag) => (
            <SubjectTag key={tag._id.toString()} href={`${PATH.TAGS}/${tag._id}`}>
              {tag.name}
            </SubjectTag>
          ))}
        </div>
      </article>

      <div className="mt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <h3 className="text-dark400_light800 paragraph-semibold">Write your answer here</h3>
          <PrimaryButton className="light-border-2 background-light800_dark300 flex-center flex items-center gap-1.5 rounded-md border px-4 py-2.5">
            <Image src="/assets/icons/stars.svg" alt="Stars" width={12} height={12} />
            <span className="primary-text-gradient small-medium mt-px">Generate AI Answer</span>
          </PrimaryButton>
        </div>

        <Answer mongoUserId={mongoUser?._id.toString()} questionId={result._id.toString()} />
      </div>
    </main>
  )
}
