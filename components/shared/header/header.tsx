'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { m, LazyMotion, domAnimation, useTransform, useMotionTemplate } from 'framer-motion'

import { cn } from '@/lib/utils'
import { HeaderHeight, Theme } from '@/constants/enums'
import { useBoundedScroll, useWindowWidth } from '@/hooks'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { Theme as ThemeComponent } from '@/components/shared/header'
import { MobileNav } from '@/components/shared/mobileNav'
import { PrimarySearch } from '@/components/shared/search'
import { PrimaryButton } from '@/components/shared/button'

const MD_BREAKPOINT = 768

export default function Header() {
  const windowWidth = useWindowWidth(MD_BREAKPOINT)

  const [isFocusSearch, setIsFocusSearch] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const wrapperSearch = useRef<HTMLDivElement>(null)

  const { resolvedTheme } = useTheme()

  const { scrollYBoundedProgress } = useBoundedScroll(300)
  const scrollYBoundedProgressThrottled = useTransform(scrollYBoundedProgress, [0, 0.5, 1], [0, 0, 1])
  const motionScale = useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, 0.9])

  useEffect(() => {
    function handleFocus() {
      setIsFocusSearch(true)

      if (windowWidth >= MD_BREAKPOINT) {
        wrapperSearch.current!.style.display = 'flex'
      }
    }

    function handleBlur() {
      setIsFocusSearch(false)
      wrapperSearch.current!.style.removeProperty('display')
    }

    const input = searchInput.current!

    input.addEventListener('focus', handleFocus)
    input.addEventListener('blur', handleBlur)

    return () => {
      input.removeEventListener('focus', handleFocus)
      input.removeEventListener('blur', handleBlur)
    }
  }, [windowWidth])

  function handleShowPrimarySearch() {
    wrapperSearch.current!.style.display = 'flex'
    searchInput.current!.focus()
  }

  return (
    <LazyMotion strict features={domAnimation}>
      <m.header
        style={{
          height: useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [HeaderHeight.Expanded, HeaderHeight.Collapsed]
          ),
          backgroundColor: useMotionTemplate`rgb(${
            resolvedTheme === Theme.LIGHT ? '255 255 255' : resolvedTheme === Theme.DARK ? '15 17 23' : 'none'
          } / ${useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, resolvedTheme === Theme.LIGHT ? 0.3 : 0.7])})`,
        }}
        className="background-light900_dark200 light-border fixed inset-x-0 top-0 z-20 flex h-[88px] items-center border-b shadow-light-header backdrop-blur-md dark:shadow-none"
      >
        <div
          className={cn('container flex items-center justify-between px-5 md:gap-5 lg:px-10', {
            'max-md:px-10': isFocusSearch,
          })}
        >
          <DevflowLogo style={{ scale: motionScale }} wrapperClassName={cn({ 'max-md:hidden': isFocusSearch })} />

          <PrimarySearch
            className="light-gradient dark:dark-gradient max-w-[600px] dark:border-light-b max-md:hidden"
            ref={wrapperSearch}
            style={{ scale: motionScale }}
          >
            <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
            <PrimarySearch.SearchInput ref={searchInput} placeholder="Search anything globally" />
          </PrimarySearch>

          <nav className={cn('flex-between shrink-0 md:gap-5', { 'gap-3': !isFocusSearch })}>
            <PrimaryButton
              className={cn('rounded-sm p-1.5 hover:bg-light-800 dark:hover:bg-dark-400 md:hidden', {
                'max-md:hidden': isFocusSearch,
              })}
              onClick={handleShowPrimarySearch}
            >
              <Image src="/assets/icons/search.svg" alt="Search" width={20} height={20} />
            </PrimaryButton>

            <ThemeComponent themeTriggerClassName={cn({ 'max-md:hidden': isFocusSearch })} />

            <m.div style={{ scale: motionScale }}>
              {(windowWidth >= MD_BREAKPOINT || !isFocusSearch) && (
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'h-10 w-10',
                      },
                      variables: {
                        colorPrimary: '#FF7000',
                      },
                    }}
                  />
                </SignedIn>
              )}
            </m.div>

            <MobileNav hamburgerClassName={cn({ hidden: isFocusSearch })} />
          </nav>
        </div>
      </m.header>
    </LazyMotion>
  )
}
