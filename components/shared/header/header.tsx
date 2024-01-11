'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { m, LazyMotion, domAnimation, useScroll, useMotionValue } from 'framer-motion'

import { cn } from '@/lib/utils'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { Theme } from '@/components/shared/header'
import { MobileNav } from '@/components/shared/mobileNav'
import { PrimarySearch } from '@/components/shared/search'
import { PrimaryButton } from '@/components/shared/button'
import { HeaderHeight } from '@/constants/enums'

const MD_BREAKPOINT = 768

export default function Header() {
  const windowWidth = useWindowWidth(MD_BREAKPOINT)

  const [isFocusSearch, setIsFocusSearch] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const wrapperSearch = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const height = useMotionValue(HeaderHeight.Expanded)

  useEffect(() => {
    function handleFocus() {
      setIsFocusSearch(true)

      if (windowWidth >= MD_BREAKPOINT) {
        wrapperSearch.current!.style.display = 'block'
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

  useEffect(() => {
    return scrollY.on('change', (current) => {
      const previous = scrollY.getPrevious()
      const diff = current - previous
      const newHeight = height.get() - diff

      height.set(Math.min(Math.max(newHeight, HeaderHeight.Collapsed), HeaderHeight.Expanded))

      console.log({ diff })
    })
  }, [height, scrollY])

  function handleShowPrimarySearch() {
    wrapperSearch.current!.style.display = 'block'
    searchInput.current!.focus()
  }

  return (
    <LazyMotion strict features={domAnimation}>
      <m.header
        style={{ height }}
        className="background-light900_dark200 light-border fixed inset-x-0 top-0 z-20 flex h-[88px] items-center border-b shadow-light-header dark:shadow-none"
      >
        <div
          className={cn('container flex justify-between px-5 md:gap-5 lg:px-10', {
            'max-md:px-10': isFocusSearch,
          })}
        >
          <DevflowLogo wrapperClassName={cn({ 'max-md:hidden': isFocusSearch })} />
          <PrimarySearch wrapperClassName="mx-auto max-w-[600px] max-md:hidden" ref={wrapperSearch}>
            <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
            <PrimarySearch.SearchInput ref={searchInput} placeholder="Search anything globally" />
          </PrimarySearch>
          <nav className="flex-between shrink-0 gap-3 md:gap-5">
            <PrimaryButton
              className={cn('rounded-sm p-1.5 hover:bg-light-800 dark:hover:bg-dark-400 md:hidden', {
                'max-md:hidden': isFocusSearch,
              })}
              onClick={handleShowPrimarySearch}
            >
              <Image src="/assets/icons/search.svg" alt="Search" width={20} height={20} />
            </PrimaryButton>
            <Theme themeTriggerClassName={cn({ 'max-md:hidden': isFocusSearch })} />
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
            <MobileNav hamburgerClassName={cn({ hidden: isFocusSearch })} />
          </nav>
        </div>
      </m.header>
    </LazyMotion>
  )
}
