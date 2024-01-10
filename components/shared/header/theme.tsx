'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

import { themes } from '@/constants'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { cn } from '@/lib/utils'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'

export default function Theme({ themeTriggerClassName }: { themeTriggerClassName?: string }) {
  const { theme, setTheme } = useTheme()
  const windowWidth = useWindowWidth(640)

  return (
    <Menubar className="relative shrink-0 border-none bg-transparent p-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            'cursor-pointer px-1.5 transition-all hover:bg-light-800 focus-visible:bg-light-800 data-[state=open]:bg-light-800 dark:hover:bg-dark-400 dark:focus-visible:bg-dark-400 dark:data-[state=open]:bg-dark-400',
            themeTriggerClassName
          )}
        >
          <Image
            src="/assets/icons/sun.svg"
            alt="Sun"
            width={20}
            height={20}
            className="active-theme rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Image
            src="/assets/icons/moon.svg"
            alt="Moon"
            width={20}
            height={20}
            className="active-theme absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </MenubarTrigger>
        <MenubarContent
          className="min-w-[120px] rounded border border-light-b bg-light-900 px-0 py-1.5 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-none"
          align={windowWidth < 640 ? 'center' : 'end'}
        >
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={() => setTheme(item.value)}
              className="hover:background-light800_dark400 cursor-pointer gap-x-1.5 px-2.5 py-2 transition-all"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={18}
                height={18}
                className={cn({ 'active-theme': theme === item.value })}
              />
              <span
                className={cn('font-semibold leading-tight text-light-500', {
                  'primary-text-gradient': theme === item.value,
                })}
              >
                {item.label}
              </span>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
