import Image from 'next/image'
import Link from 'next/link'

import { Author } from '@/types'

export default function Author({ author }: { author: Author }) {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src={author.avatar} alt={author.name} width={20} height={20} />
      <span className="body-medium text-dark400_light700">{author.name}</span>
    </Link>
  )
}
