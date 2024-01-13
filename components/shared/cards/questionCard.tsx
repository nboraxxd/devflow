import { Question } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

import { PrimaryButton, SubjectTag } from '@/components/shared/button'

export default function QuestionCard({ question }: { question: Question }) {
  const { title, author, tags, upvotes, views, answers, createdAt, updatedAt } = question

  return (
    <section className="card-wrapper rounded-[10px] p-5 md:px-11 md:py-9">
      <div className="flex flex-col-reverse gap-2.5 md:flex-row">
        <div>
          <p className="subtle-regular text-dark400_light700 line-clamp-1 md:hidden">[[asked 2 mins ago]]</p>
          <h2 className="h3-semibold text-dark200_light900 line-clamp-2 max-md:mt-0.5">
            <Link href="/">{question.title}</Link>
          </h2>
        </div>

        <div className="flex items-center">
          <button>
            <Image src="/assets/icons/edit.svg" alt="Edit" width={16} height={16} />
          </button>
          <Image src="/assets/icons/trash.svg" alt="Delete" width={16} height={16} />
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SubjectTag key={tag._id}>{tag.name}</SubjectTag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <Link href="/" className="flex items-center gap-1">
            <Image src={author.avatar} alt={author.name} width={20} height={20} />
            <span className="body-medium text-dark400_light700">{author.name}</span>
          </Link>

          <span className="mt-0.5 max-md:hidden">•</span>

          <p className="small-regular text-dark400_light700 mt-0.5 max-md:hidden">[[asked 2 mins ago]]</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/like.svg" alt="Votes" width={16} height={16} />
            <p className="text-dark400_light800">
              <span className="small-medium">{upvotes}</span>
              <span className="small-regular"> {upvotes <= 1 ? 'vote' : 'votes'}</span>
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/message.svg" alt="Votes" width={16} height={16} />
            <p className="text-dark400_light800">
              <span className="small-medium">{upvotes}</span>
              <span className="small-regular"> {upvotes <= 1 ? 'answer' : 'answers'}</span>
            </p>
          </div>

          <div className="flex items-center gap-0.5">
            <Image src="/assets/icons/eye.svg" alt="Votes" width={16} height={16} />
            <p className="text-dark400_light800">
              <span className="small-medium">{upvotes}</span>
              <span className="small-regular"> {upvotes <= 1 ? 'view' : 'views'}</span>
            </p>
          </div>
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
