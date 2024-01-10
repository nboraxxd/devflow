'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { Theme } from '@/components/shared/header'
import { MobileNav } from '@/components/shared/mobileNav'
import { PrimarySearch } from '@/components/shared/search'

const mdBreakpoint = 768

export default function Header() {
  const searchInput = useRef<HTMLInputElement>(null)
  const wrapperSearch = useRef<HTMLDivElement>(null)

  const [focused, setFocused] = useState(false)

  const windowWidth = useWindowWidth(mdBreakpoint)

  useEffect(() => {
    function handleFocus() {
      if (windowWidth < mdBreakpoint) {
        setFocused(true)
      }
    }
    function handleBlur() {
      if (windowWidth < mdBreakpoint) {
        setFocused(false)
        wrapperSearch.current!.style.removeProperty('display')
      }
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
    <header className="background-light900_dark200 light-border sticky top-0 z-20 border-b shadow-light-header dark:shadow-none">
      <nav className={cn('flex-between container px-5 py-6 lg:px-10', { 'px-10': focused, 'gap-5': !focused })}>
        <DevflowLogo wrapperClassName={cn({ hidden: focused })} />

        <PrimarySearch wrapperClassName="mx-auto max-w-[600px] max-md:hidden" ref={wrapperSearch}>
          <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
          <PrimarySearch.SearchInput ref={searchInput} placeholder="Search anything globally" />
        </PrimarySearch>

        <div className="flex-between shrink-0 gap-3 md:gap-5">
          <button
            className={cn(
              'rounded-sm p-1.5 transition-all hover:bg-light-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:hover:bg-dark-400 md:hidden',
              { hidden: focused }
            )}
            onClick={handleShowPrimarySearch}
          >
            <Image src="/assets/icons/search.svg" alt="Search" width={20} height={20} />
          </button>

          <Theme themeTriggerClassName={cn({ hidden: focused })} />

          {!focused && (
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

          <MobileNav hamburgerClassName={cn({ hidden: focused })} />
        </div>
      </nav>
    </header>
  )
}
