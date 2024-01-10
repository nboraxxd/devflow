'use client'

import { FilterTag } from '@/components/shared/button'
import { PrimarySearch } from '@/components/shared/search'

export default function HomeFilter() {
  return (
    <>
      <PrimarySearch wrapperClassName="mt-8">
        <PrimarySearch.SearchIcon iconSrc="/assets/icons/search.svg" iconAlt="Search" />
        <PrimarySearch.SearchInput placeholder="Search for questions here..." />
      </PrimarySearch>

      <ul className="mt-8 flex gap-3 max-md:hidden">
        <li>
          <FilterTag>Recommended Questions</FilterTag>
        </li>
        <li>
          <FilterTag isActive={true}>Frequent</FilterTag>
        </li>
      </ul>
    </>
  )
}
