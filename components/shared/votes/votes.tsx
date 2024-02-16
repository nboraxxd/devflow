'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.actions'
import { PrimaryButton } from '@/components/shared/button'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'

interface Props {
  type: 'question' | 'answer'
  itemId: string
  userId?: string
  upvotes: number
  hasUpvoted: boolean
  downvotes: number
  hasDownvoted: boolean
  hasSaved?: boolean
}

export default function Votes(props: Props) {
  const { type, itemId, userId, upvotes, hasUpvoted, downvotes, hasDownvoted, hasSaved } = props

  const pathname = usePathname()

  async function handleVote(action: 'upvote' | 'downvote') {
    if (!userId) return

    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion({ userId, questionId: itemId, hasUpvoted, hasDownvoted, path: pathname })
      } else if (type === 'answer') {
        await upvoteAnswer({ userId, answerId: itemId, hasUpvoted, hasDownvoted, path: pathname })
      }

      // TODO: Show toast
      return
    }

    if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion({ userId, questionId: itemId, hasUpvoted, hasDownvoted, path: pathname })
      } else if (type === 'answer') {
        await downvoteAnswer({ userId, answerId: itemId, hasUpvoted, hasDownvoted, path: pathname })
      }

      // TODO: Show toast
    }
  }

  async function handleSave() {
    if (!userId) return

    await toggleSaveQuestion({ userId, questionId: itemId, path: pathname })
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2.5">
        {/* Upvote */}
        <div className="flex items-center gap-1.5">
          <PrimaryButton onClick={() => handleVote('upvote')}>
            <Image
              src={`${hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
              alt="upvote"
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
          <PrimaryButton onClick={() => handleVote('downvote')}>
            <Image
              src={`${hasDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}`}
              alt="downvote"
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
      {type === 'question' && (
        <PrimaryButton onClick={handleSave}>
          <Image
            src={`${hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}`}
            alt="save"
            width={18}
            height={18}
          />
        </PrimaryButton>
      )}
    </div>
  )
}
