'use client'

import Image from 'next/image'
import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, MotionProps, m } from 'framer-motion'

import { cn, formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { Input, InputProps } from '@/components/ui/input'
import { GlobalSearchResult } from '@/components/shared/search'

interface SearchInputProps extends InputProps {
  placeholder: string
  route: string
  className?: string
}

// Step 3. Create child components to help implementing the common tasks
function SearchIcon({ iconSrc, iconAlt }: { iconSrc: string; iconAlt: string }) {
  return <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
}

const LocalSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function LocalSearchInput(
  { placeholder, className, route },
  ref
) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q')

  const [search, setSearch] = useState(searchQuery || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
          omit: search !== searchQuery ? ['page', 'filter'] : undefined,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [pathname, route, router, search, searchParams, searchQuery])

  return (
    <Input
      ref={ref}
      type="text"
      value={search}
      onChange={(ev) => setSearch(ev.target.value)}
      placeholder={placeholder}
      className={cn(
        'text-dark400_light700 paragraph-regular no-focus placeholder border-none bg-transparent px-0 shadow-none outline-none placeholder-shown:text-ellipsis',
        className
      )}
    />
  )
})

const GlobalSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function GlobalSearchInput(
  { placeholder, className },
  ref
) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('global')

  const { searchContainerRef } = useContext(SearchContext)
  const [search, setSearch] = useState(searchQuery || '')
  const [isOpen, setIsOpen] = useState(searchQuery || false)

  function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearch(ev.target.value)

    if (!isOpen) setIsOpen(true)

    if (ev.target.value === '' && isOpen) setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleOutsideClick(ev: MouseEvent) {
      if (searchContainerRef?.current && !searchContainerRef.current.contains(ev.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [searchContainerRef])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (searchQuery) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [router, search, searchParams, searchQuery])

  return (
    <>
      <Input
        ref={ref}
        type="text"
        value={search}
        onChange={onChangeInput}
        placeholder={placeholder}
        className={cn(
          'text-dark400_light700 paragraph-regular no-focus placeholder border-none bg-transparent px-0 shadow-none outline-none placeholder-shown:text-ellipsis',
          className
        )}
      />
      <AnimatePresence>{isOpen && <GlobalSearchResult />}</AnimatePresence>
    </>
  )
})

interface PrimarySearchProps extends MotionProps {
  children: ReactNode
  className?: string
}

interface PrimarySearchType extends ForwardRefExoticComponent<PrimarySearchProps & RefAttributes<HTMLDivElement>> {
  LocalSearchInput: typeof LocalSearchInput
  GlobalSearchInput: typeof GlobalSearchInput
  SearchIcon: typeof SearchIcon
}

interface PrimarySearchContext {
  searchContainerRef: React.RefObject<HTMLDivElement> | null
}

// Step 1. Create a context
const SearchContext = createContext<PrimarySearchContext>({ searchContainerRef: null })

// Step 2. Create parent component
const PrimarySearch = forwardRef<HTMLDivElement, PrimarySearchProps>(function PrimarySearch(
  { children, className, style },
  ref
) {
  return (
    <SearchContext.Provider value={{ searchContainerRef: ref as React.RefObject<HTMLDivElement> }}>
      <m.div
        style={style}
        className={cn(
          'relative flex min-h-[48px] w-full grow items-center gap-3 rounded-xl border border-light-700 px-4',
          className
        )}
        ref={ref}
      >
        {children}
      </m.div>
    </SearchContext.Provider>
  )
}) as PrimarySearchType

// Step 4. Add child components as properties to parent component
PrimarySearch.LocalSearchInput = LocalSearchInput
PrimarySearch.GlobalSearchInput = GlobalSearchInput
PrimarySearch.SearchIcon = SearchIcon

export default PrimarySearch
