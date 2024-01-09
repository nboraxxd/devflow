import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  wrapperClassName?: string
  textClassName?: string
  width?: number
  height?: number
}

export default function DevflowLogo({ wrapperClassName, textClassName, width = 23, height = 23 }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        'flex shrink-0 items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        wrapperClassName
      )}
    >
      <Image src="/assets/images/site-logo.svg" width={width} height={height} alt="DevFlow" />
      <p className={cn('h2-bold text-dark100_light900 font-spaceGrotesk max-xs:hidden', textClassName)}>
        Dev<span className="text-primary-500">flow</span>
      </p>
    </Link>
  )
}
