import Image from 'next/image'

import { formatNumberToSocialStyle } from '@/lib/utils'

interface Props {
  title: string
  iconUrl: string
  value: number
}

export default function StatsCard({ iconUrl, title, value }: Props) {
  return (
    <div className="shadow-light100_dark200 background-light900_dark200 flex items-center gap-3 rounded-[10px] border border-light-b px-3 py-6 dark:border-dark-300 sm:px-6 md:gap-5 xl:px-11">
      <Image src={iconUrl} alt={title} height={54} width={40} className='h-[54px] w-10' />
      <div className="shrink-0">
        <span className="text-dark200_light900 paragraph-semibold block">{formatNumberToSocialStyle(value)}</span>
        <span className="text-dark400_light700 body-medium block">{value > 1 ? `${title}s` : title}</span>
      </div>
    </div>
  )
}
