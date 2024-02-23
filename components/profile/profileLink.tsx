import Image from 'next/image'
import Link from 'next/link'

interface Props {
  iconUrl: string
  iconAlt: string
  title: string
  href?: string
}

export default function ProfileLink({ iconUrl, iconAlt, title, href }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Image src={iconUrl} alt={iconAlt} width={20} height={20} className="h-5 w-5" />
      {href ? (
        <Link href={href} target="_blank" className="paragraph-medium mt-px text-blue-500">
          {title}
        </Link>
      ) : (
        <span className="paragraph-medium text-dark400_light700 mt-px">{title}</span>
      )}
    </div>
  )
}
