import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: ReactNode
  href?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
  disabled?: boolean
}

export default function LinkGradient({ href, children, className, type, disabled, ...rest }: Props) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'paragraph-medium primary-gradient flex min-h-[46px] items-center gap-4 rounded-lg p-4 py-1 text-light-900 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'paragraph-medium primary-gradient paragraph-medium flex min-h-[46px] items-center gap-4 rounded-lg p-4 py-1 text-light-900 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
