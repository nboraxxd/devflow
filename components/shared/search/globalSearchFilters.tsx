import { useRouter, useSearchParams } from 'next/navigation'

import { cn, formUrlQuery } from '@/lib/utils'
import { globalSearchFilters } from '@/constants/filters'
import { FilterButton } from '@/components/shared/button'

export default function GlobalSearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const typeParams = searchParams.get('type')

  function handleClickFilter(item: (typeof globalSearchFilters)[number]['value']) {
    const newUrl = formUrlQuery({
      key: 'type',
      params: searchParams.toString(),
      value: typeParams === item ? null : item,
      omit: typeParams === item ? ['type'] : undefined,
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex items-center gap-5 px-6">
      <span className="text-dark400_light800 base-semibold max-sm:hidden">Type:</span>
      <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll">
        {globalSearchFilters.map((item) => (
          <FilterButton
            key={item.value}
            label={item.name}
            value={item.value}
            isActive={false}
            handleClickFilter={handleClickFilter}
            buttonClassName={cn(
              'min-h-[36px] rounded-[40px] bg-light-700 px-5 hover:bg-light-600 dark:bg-dark-300 hover:dark:bg-dark-200',
              { 'primary-gradient': item.value === typeParams }
            )}
            childrenClassName={cn('small-semibold text-dark500_light900', {
              'text-light-900': item.value === typeParams,
            })}
          />
        ))}
      </div>
    </div>
  )
}
