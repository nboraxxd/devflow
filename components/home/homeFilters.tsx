'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { HomePageFilters } from '@/constants/filters'
import { PATH } from '@/constants/path'
import { cn, formUrlQuery } from '@/lib/utils'
import { FilterButton } from '@/components/shared/button'
import { PrimarySearch } from '@/components/shared/search'
import { Filter } from '@/components/shared/filter'

export default function HomeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filterParams = searchParams.get('filter')

  function handleClickFilter(item: (typeof HomePageFilters)[number]['value']) {
    const newUrl = formUrlQuery({
      key: 'filter',
      params: searchParams.toString(),
      value: filterParams === item ? null : item,
      omit: filterParams === item ? ['filter'] : undefined,
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
        <PrimarySearch className="background-light800_dark300 border-light-700 dark:border-none">
          <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
          <PrimarySearch.LocalSearchInput placeholder="Search for questions here..." route={PATH.HOMEPAGE} />
        </PrimarySearch>

        <Filter
          filters={HomePageFilters}
          containerClassName="block shrink-0 md:hidden"
          filterClassName="min-h-[48px] min-w-[170px] gap-1"
        />
      </div>

      <ul className="mt-8 flex gap-3 max-md:hidden">
        {HomePageFilters.map((item) => (
          <li key={item.value}>
            <FilterButton
              label={item.name}
              handleClickFilter={handleClickFilter}
              value={item.value}
              isActive={item.value === filterParams}
              childrenClassName={cn('body-medium text-light-500', {
                'primary-text-gradient': item.value === filterParams,
              })}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
