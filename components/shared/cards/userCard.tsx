import Image from 'next/image'
import Link from 'next/link'

import { PATH } from '@/constants/path'
import { SubjectTag } from '@/components/shared/button'
import { getTopInteractedTags } from '@/lib/actions/tag.action'

interface UserCardProps {
  _id: string
  clerkId: string
  name: string
  username: string
  picture: string
}

export default async function UserCard({ _id, clerkId, name, picture, username }: UserCardProps) {
  const interactedTags = await getTopInteractedTags({ userId: _id, limit: 3 })

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
        href={`${PATH.PROFILES}/${clerkId}`}
        className="text-dark500_light500 body-regular mt-1.5 line-clamp-1 break-all"
      >
        @{username}
      </Link>

      <div className="flex-between mt-5 gap-2">
        {interactedTags.length > 0 ? (
          interactedTags.map((tag) => (
            <SubjectTag key={tag._id.toString()}>
              {tag.name}
            </SubjectTag>
          ))
        ) : (
          <SubjectTag>No tags yet</SubjectTag>
        )}
      </div>
    </section>
  )
}
