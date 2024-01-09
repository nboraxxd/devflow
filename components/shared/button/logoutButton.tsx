import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export default function LogoutButton({ children, className, ...rest }: Props) {
  return (
    <button
      className={cn(
        'flex-center min-h-[42px] w-full rounded-lg px-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-dark300_light900 hover:background-light800_darkgradient transition duration-300',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
