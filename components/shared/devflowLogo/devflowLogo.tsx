import Link from 'next/link'
import { CSSProperties } from 'react'
import Image from 'next/image'
import { MotionProps, m } from 'framer-motion'

import { cn } from '@/lib/utils'

interface Props extends MotionProps {
  wrapperClassName?: string
  textClassName?: string
  width?: number
  height?: number
}

export default function DevflowLogo({ wrapperClassName, textClassName, style, width = 23, height = 23 }: Props) {
  const MotionLink = m(Link)

  return (
    <MotionLink
      href="/"
      className={cn(
        'flex shrink-0 items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        wrapperClassName
      )}
      style={style as CSSProperties} // Explicitly type the style prop as CSSProperties
    >
      <Image src="/assets/images/site-logo.svg" width={width} height={height} alt="DevFlow" />
      <p className={cn('h2-bold text-dark100_light900 font-spaceGrotesk max-xs:hidden', textClassName)}>
        Dev<span className="text-primary-500">flow</span>
      </p>
    </MotionLink>
  )
}
