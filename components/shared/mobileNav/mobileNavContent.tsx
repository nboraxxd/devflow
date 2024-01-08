'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SheetClose } from '@/components/ui/sheet'

export default function MobileNavContent() {
  const pathname = usePathname()

  return (
    <section className="mt-20 flex h-full flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={cn('flex items-center gap-4 p-4', { 'primary-gradient rounded-lg': isActive })}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn({ 'invert-colors': !isActive })}
              />
              <p
                className={cn('paragraph-medium mt-[1px]', {
                  'font-semibold text-light-900': isActive,
                  'text-dark300_light900': !isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}
