import Image from 'next/image'
import Link from 'next/link'

import { PATH } from '@/constants/path'
import { formatNumberToSocialStyle, getTimestamp } from '@/lib/utils'
import { getQuestionById } from '@/lib/actions/question.actions'
import { Metric } from '@/components/shared/metric'

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getQuestionById(params.id)

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

        
      </article>
    </main>
  )
}
