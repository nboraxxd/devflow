'use client'

import { PrimaryButton } from '@/components/shared/button'
import Image from 'next/image'

interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasUpvoted: boolean
  downvotes: number
  hasDownvoted: boolean
  hasSaved?: boolean
}

export default function Votes(props: Props) {
  const { type, itemId, userId, upvotes, hasUpvoted, downvotes, hasDownvoted, hasSaved } = props

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2.5">
        {/* Upvote */}
        <div className="flex items-center gap-1.5">
          <PrimaryButton>
            <Image
              src={`${hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
              alt="Upvote"
              width={18}
              height={18}
            />
          </PrimaryButton>
          <div className="background-light700_dark400 subtle-medium text-dark400_light900 flex-center h-[18px] w-[18px] rounded-sm">
            {upvotes}
          </div>
        </div>

        {/* Downvote */}
        <div className="flex items-center gap-1.5">
          <PrimaryButton>
            <Image
              src={`${hasDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}`}
              alt="Downvote"
              width={18}
              height={18}
            />
          </PrimaryButton>
          <div className="background-light700_dark400 subtle-medium text-dark400_light900 flex-center h-[18px] w-[18px] rounded-sm">
            {downvotes}
          </div>
        </div>
      </div>

      {/* Save */}
      <PrimaryButton>
        <Image
          src={`${hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}`}
          alt="Saved"
          width={18}
          height={18}
        />
      </PrimaryButton>
    </div>
  )
}
