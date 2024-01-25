import Image from 'next/image'
import Link from 'next/link'

import { User } from '@/types/user.types'

export default function Author({ author }: { author: User }) {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src={author.picture} alt={author.name} width={20} height={20} className='rounded-full' />
      <span className="body-medium text-dark400_light700">{author.name}</span>
    </Link>
  )
}
