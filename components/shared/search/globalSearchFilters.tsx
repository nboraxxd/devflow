import { cn } from '@/lib/utils'
import { globalSearchFilters } from '@/constants/filters'
import { FilterButton } from '@/components/shared/button'

export default function GlobalSearchFilters() {
  return (
    <div className="flex items-center gap-5 px-6">
      <span className="text-dark400_light800 base-semibold">Type:</span>
      <div className="no-scrollbar flex items-center gap-3 overflow-x-scroll">
        {globalSearchFilters.map((item) => (
          <FilterButton
            key={item.value}
            label={item.name}
            value={item.value}
            isActive={false}
            handleClickFilter={(value) => {
              console.log(value)
            }}
            // primary-gradient
            buttonClassName={cn('min-h-[36px] rounded-[40px] bg-light-700 px-5 dark:bg-dark-300')}
            childrenClassName="small-semibold text-dark500_light900"
          />
        ))}
      </div>
    </div>
  )
}
