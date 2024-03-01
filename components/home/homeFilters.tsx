'use client'

import { HomePageFilters } from '@/constants/filters'
import { PATH } from '@/constants/path'
import { FilterTag } from '@/components/shared/button'
import { PrimarySearch } from '@/components/shared/search'
import { Filter } from '@/components/shared/filter'

export default function HomeFilters() {
  return (
    <>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
        <PrimarySearch className="background-light800_dark300 border-light-700 dark:border-none">
          <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
          <PrimarySearch.SearchInput placeholder="Search for questions here..." route={PATH.HOMEPAGE} />
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
            <FilterTag>{item.name}</FilterTag>
          </li>
        ))}
      </ul>
    </>
  )
}
