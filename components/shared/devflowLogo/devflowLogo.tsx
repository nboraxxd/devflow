import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  wrapClassName?: string
  textClassName?: string
  width?: number
  height?: number
}

export default function DevflowLogo({ wrapClassName, textClassName, width = 23, height = 23 }: Props) {
  return (
    <Link href="/" className={cn('flex items-center gap-1 shrink-0', wrapClassName)}>
      <Image src="/assets/images/site-logo.svg" width={width} height={height} alt="DevFlow" />
      <p className={cn('h2-bold font-spaceGrotesk text-dark100_light900 max-md:hidden', textClassName)}>
        Dev<span className="text-primary-500">flow</span>
      </p>
    </Link>
  )
}
