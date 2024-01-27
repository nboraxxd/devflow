import Image from 'next/image'
import Link from 'next/link'

import { PATH } from '@/constants/path'
import { SubjectTag } from '@/components/shared/button'

interface UserCardProps {
  clerkId: string
  name: string
  username: string
  picture: string
}

export default function UserCard({ clerkId, name, picture, username }: UserCardProps) {
  return (
    <section className="shadow-light100_darknone background-light900_dark200 flex flex-col items-center rounded-[10px] border border-light-b p-7 dark:border-dark-300 max-xs:min-w-full xs:w-[260px]">
      <Image
        src={picture}
        alt={name}
        width={100}
        height={100}
        className="h-[100px] w-[100px] rounded-full object-cover"
      />
      <h2 className="text-dark200_light900 h3-bold mt-5 line-clamp-1 break-all">{name}</h2>
      <Link
        href={`${PATH.USER}/${clerkId}`}
        className="text-dark500_light500 body-regular mt-1.5 line-clamp-1 break-all"
      >
        @{username}
      </Link>

      <div className="flex-between mt-5 gap-2">
        <SubjectTag>[[HTML]]</SubjectTag>
        <SubjectTag>[[HTML]]</SubjectTag>
        <SubjectTag>[[HTML]]</SubjectTag>
      </div>
    </section>
  )
}
