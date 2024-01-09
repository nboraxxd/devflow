'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { SidebarLink } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  item: SidebarLink
  wrapperClassName?: string
  imageClassName?: string
  textClassName?: string
}

export default function LeftSidebarItem({ item, wrapperClassName, imageClassName, textClassName }: Props) {
  const pathname = usePathname()

  const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

  return (
    <Link
      href={item.route}
      className={cn(
        'flex items-center gap-4 rounded-lg p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        { 'primary-gradient': isActive, 'hover:background-light800_darkgradient transition duration-300': !isActive },
        wrapperClassName
      )}
    >
      <Image
        src={item.imgURL}
        alt={item.label}
        width={24}
        height={24}
        className={cn({ 'invert-colors': !isActive }, imageClassName)}
      />
      <h2
        className={cn(
          'paragraph-medium mt-0.5',
          {
            'font-semibold text-light-900': isActive,
            'text-dark300_light900': !isActive,
          },
          textClassName
        )}
      >
        {item.label}
      </h2>
    </Link>
  )
}
