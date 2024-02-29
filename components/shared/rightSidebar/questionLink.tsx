import Link from 'next/link'
import Image from 'next/image'

import { PATH } from '@/constants/path'

interface Props {
  children: string
  id: string
}

export default function QuestionLink({ children, id }: Props) {
  return (
    <Link
      href={`${PATH.QUESTIONS}/${id}`}
      className="flex items-start justify-between gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <h3 className="text-dark500_light700 body-medium">{children}</h3>
      <Image
        src="/assets/icons/chevron-right.svg"
        alt="chevron right"
        width={20}
        height={20}
        className="invert-colors"
        priority
      />
    </Link>
  )
}
