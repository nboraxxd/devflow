'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { PATH } from '@/constants/path'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export default function LogoutButton({ children, className, ...rest }: Props) {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <button
      className={cn(
        'flex-center text-dark300_light900 hover:background-light800_darkgradient min-h-[42px] w-full rounded-lg px-4 py-1 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      {...rest}
      onClick={() => signOut(() => router.push(PATH.HOMEPAGE))}
    >
      {children}
    </button>
  )
}
