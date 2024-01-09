import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

interface Props extends LinkProps {
  children: ReactNode
  className?: string
}

export default function AuthButton({ children, className, href, ...rest }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'flex-center min-h-[42px] w-full rounded-lg px-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
