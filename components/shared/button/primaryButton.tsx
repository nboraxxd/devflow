import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export default function PrimaryButton({ children, className, ...props }: ComponentProps<'button'>) {
  return (
    <button className={cn('focus-primary transition-all', className)} {...props}>
      {children}
    </button>
  )
}
