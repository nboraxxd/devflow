import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Props {
  iconSrc: string
  iconAlt: string
  placeholder: string
  iconPosition?: 'left' | 'right'
  wrapperClassName?: string
}

export default function PrimarySearch(props: Props) {
  const { iconSrc, iconAlt, iconPosition = 'left', placeholder, wrapperClassName } = props

  return (
    <div className={cn('relative w-full', wrapperClassName)}>
      <div className="background-light800_darkgradient relative flex min-h-[52px] grow items-center gap-3 rounded-xl border border-light-700 px-4 dark:border-none">
        {iconPosition === 'left' && (
          <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="cursor-pointer" />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          className="text-dark400_light700 paragraph-regular no-focus placeholder border-none bg-transparent px-0 shadow-none outline-none"
        />
        {iconPosition === 'right' && (
          <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="cursor-pointer" />
        )}
      </div>
    </div>
  )
}
