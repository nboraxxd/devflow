import { Question } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

import { PrimaryButton, SubjectTag } from '@/components/shared/button'
import { Author } from '@/components/shared/author'
import { Metric } from '../metric'
import { formatNumberToSocialStyle, getTimestamp } from '@/lib/utils'

export default function QuestionCard({ question }: { question: Question }) {
  const { title, author, tags, upvotes, views, answers, createdAt } = question

  return (
    <section className="card-wrapper rounded-[10px] p-5 md:px-11 md:py-9">
      <div className="flex flex-col-reverse gap-2.5 md:flex-row">
        <div>
          <p className="subtle-regular text-dark400_light700 line-clamp-1 md:hidden">{getTimestamp(createdAt)}</p>
          <h2 className="h3-semibold text-dark200_light900 line-clamp-2 max-md:mt-0.5">
            <Link href="/">{title}</Link>
          </h2>
        </div>

        <div className="flex shrink-0 items-center max-md:justify-end md:ml-auto">
          <PrimaryButton className="p-1">
            <Image src="/assets/icons/edit.svg" alt="Edit" width={16} height={16} />
          </PrimaryButton>
          <PrimaryButton className="p-1">
            <Image src="/assets/icons/trash.svg" alt="Delete" width={16} height={16} />
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SubjectTag key={tag._id}>{tag.name}</SubjectTag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <Author author={author} />

          <span className="mt-0.5 max-md:hidden">•</span>

          <p className="small-regular text-dark400_light700 mt-0.5 max-md:hidden">asked {getTimestamp(createdAt)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Metric
            iconUrl="/assets/icons/like.svg"
            alt="Votes"
            value={formatNumberToSocialStyle(upvotes)}
            title="vote"
            titles="votes"
          />
          <Metric
            iconUrl="/assets/icons/message.svg"
            alt="Answers"
            value={formatNumberToSocialStyle(answers)}
            title="answer"
            titles="answers"
          />
          <Metric
            iconUrl="/assets/icons/eye.svg"
            alt="Views"
            value={formatNumberToSocialStyle(views)}
            title="view"
            titles="views"
          />
        </div>
      </div>
    </section>
  )
}

// font-family: Inter;
// font-size: 20px;
// font-style: normal;
// font-weight: 600;
// line-height: 124%; /* 24.8px */
