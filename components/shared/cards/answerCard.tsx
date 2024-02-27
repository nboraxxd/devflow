import Link from 'next/link'
import Image from 'next/image'

import { PATH } from '@/constants/path'
import { AnswerReturnType } from '@/lib/actions/user.action'
import { formatNumberToSocialStyle, getTimestamp } from '@/lib/utils'
import { PrimaryButton } from '@/components/shared/button'
import { Metric } from '@/components/shared/metric'
import { Author } from '@/components/shared/author'

interface Props {
  answer: AnswerReturnType
}

export default function AnswerCard({ answer }: Props) {
  const { _id, question, author, createdAt, upvotes } = answer

  return (
    <section className="card-wrapper rounded-[10px] p-5 md:px-11 md:py-9">
      <div className="flex flex-col-reverse gap-2.5 md:flex-row">
        <div>
          <p className="subtle-regular text-dark400_light700 line-clamp-1 md:hidden">{getTimestamp(createdAt)}</p>
          <h2 className="h3-semibold text-dark200_light900 max-md:mt-0.5">
            <Link href={`${PATH.QUESTIONS}/${question._id.toString()}#${_id.toString()}`} className="line-clamp-2">
              {question.title}
            </Link>
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <Author author={author} authorClassName="body-medium text-dark400_light700" />
          <span className="mt-0.5 max-md:hidden">•</span>
          <span className="small-regular text-dark400_light700 mt-0.5 max-md:hidden">
            answer {getTimestamp(createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Metric
            iconUrl="/assets/icons/like.svg"
            alt="Votes"
            value={formatNumberToSocialStyle(upvotes.length)}
            title="vote"
            titles="votes"
          />
        </div>
      </div>
    </section>
  )
}
