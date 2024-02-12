import Image from 'next/image'
import Link from 'next/link'

import { User } from '@/types/user.types'
import { PATH } from '@/constants/path'
import { cn } from '@/lib/utils'
import { ElementType } from 'react'

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

  return (
    <Link href={`${PATH.USERS}/${author.clerkId}`} className={cn('flex items-center gap-1.5', linkClassName)}>
      <Image
        src={author.picture}
        alt={author.name}
        width={imageWidth}
        height={imageHeight}
        className={cn('mb-px rounded-full', imageClassName)}
      />
      <Element className={cn(authorClassName)}>{author.name}</Element>
    </Link>
  )
}
