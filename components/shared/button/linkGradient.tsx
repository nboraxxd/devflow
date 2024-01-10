import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

interface Props extends LinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function LinkGradient({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'paragraph-medium primary-gradient paragraph-medium flex min-h-[46px] items-center gap-4 rounded-lg p-4 py-1 text-light-900 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </Link>
  )
}
