import Image from 'next/image'
import Link from 'next/link'
import { ElementType } from 'react'
import { auth } from '@clerk/nextjs'

import { User } from '@/types/user.types'
import { PATH } from '@/constants/path'
import { cn } from '@/lib/utils'

interface Props {
  author: Pick<User, 'name' | 'picture' | 'clerkId'>
  imageWidth?: number
  imageHeight?: number
  imageClassName?: string
  authorClassName: string
  linkClassName?: string
  authorTag?: ElementType
}

export default function Author(props: Props) {
  const {
    author,
    linkClassName,
    imageWidth = 20,
    imageHeight = 20,
    imageClassName,
    authorClassName,
    authorTag: Element = 'span',
  } = props

  const { userId: clerkId } = auth()

  return (
    <Link
      href={author.clerkId === clerkId ? PATH.MY_PROFILE : `${PATH.PROFILES}/${author.clerkId}`}
      className={cn('flex items-center gap-1.5', linkClassName)}
    >
      <Image
        src={author.picture}
        alt={author.name}
        width={imageWidth}
        height={imageHeight}
        className={cn('mb-px aspect-square rounded-full', imageClassName)}
      />
      <Element className={cn(authorClassName)}>{author.name}</Element>
    </Link>
  )
}
