'use client'

import { useTheme } from 'next-themes'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Theme as ThemeType } from '@/constants/enums'
import { themes } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Theme() {
  const { theme, systemTheme, setTheme } = useTheme()

  return (
    <Menubar className="relative border-none bg-transparent p-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer px-1.5 focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {(theme === ThemeType.LIGHT || (theme === ThemeType.SYSTEM && systemTheme === ThemeType.LIGHT)) && (
            <Image src="/assets/icons/sun.svg" alt="Sun" width={20} height={20} className="active-theme" />
          )}
          {(theme === ThemeType.DARK || (theme === ThemeType.SYSTEM && systemTheme === ThemeType.DARK)) && (
            <Image src="/assets/icons/moon.svg" alt="Moon" width={20} height={20} className="active-theme" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] min-w-[120px] rounded border border-light-b bg-light-900 px-0 py-1.5 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-none">
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
                  'text-primary-500': theme === item.value,
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
