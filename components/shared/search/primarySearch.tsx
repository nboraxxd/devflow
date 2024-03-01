'use client'

import Image from 'next/image'
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  createContext,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MotionProps, m } from 'framer-motion'

import { Input, InputProps } from '@/components/ui/input'
import { cn, formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

interface SearchInputProps extends InputProps {
  placeholder: string
  route?: string
  className?: string
}

// Step 3. Create child components to help implementing the common tasks
function SearchIcon({ iconSrc, iconAlt }: { iconSrc: string; iconAlt: string }) {
  return <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { placeholder, className, route },
  ref
) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
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
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [pathname, route, router, search, searchParams])

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

interface PrimarySearchProps extends MotionProps {
  children: ReactNode
  className?: string
}

interface PrimarySearchType extends ForwardRefExoticComponent<PrimarySearchProps & RefAttributes<HTMLDivElement>> {
  SearchInput: typeof SearchInput
  SearchIcon: typeof SearchIcon
}

// Step 1. Create a context
const SearchContext = createContext({})

// Step 2. Create parent component
const PrimarySearch = forwardRef<HTMLDivElement, PrimarySearchProps>(function PrimarySearch(
  { children, className, style },
  ref
) {
  return (
    <SearchContext.Provider value={{}}>
      <m.div
        style={style}
        className={cn(
          'flex min-h-[48px] w-full grow items-center gap-3 rounded-xl border border-light-700 px-4',
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
PrimarySearch.SearchInput = SearchInput
PrimarySearch.SearchIcon = SearchIcon

export default PrimarySearch
