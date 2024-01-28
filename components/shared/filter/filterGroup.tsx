'use client'

import { PrimarySearch } from '@/components/shared/search'
import { Filter } from '@/components/shared/filter'

interface FilterGroupProps {
  inputPlacehoder: string
  filters: { name: string; value: string; }[]
}

export default function FilterGroup({ inputPlacehoder, filters }: FilterGroupProps) {
  return (
    <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
      <PrimarySearch className="background-light800_dark300 min-h-[56px] border-light-700 dark:border-none">
        <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
        <PrimarySearch.SearchInput placeholder={inputPlacehoder} />
      </PrimarySearch>

      <Filter
        filters={filters}
        containerClassName="block shrink-0"
        filterClassName="min-h-[56px] min-w-[200px] gap-1.5"
      />
    </div>
  )
}
