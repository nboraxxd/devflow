'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn, formUrlQuery } from '@/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterProps {
  filters: ReadonlyArray<{
    readonly name: string
    readonly value: string
  }>
  filterClassName?: string
  containerClassName?: string
}

export default function Filter({ filters, filterClassName, containerClassName }: FilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramsFilter = searchParams.get('filter')

  function handleUpdateParams(value: string) {
    const newUrl = formUrlQuery({
      key: 'filter',
      params: searchParams.toString(),
      value,
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className={cn('relative', containerClassName)}>
      <Select onValueChange={handleUpdateParams} defaultValue={paramsFilter || undefined}>
        <SelectTrigger
          className={cn(
            'background-light800_dark300 body-regular text-dark500_light700 border-light-700 px-5 py-2.5 dark:border-none',
            filterClassName
          )}
        >
          <Image src="/assets/icons/filter.svg" alt="Filter" width={24} height={24} />
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent align="end" className="background-light800_dark300">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer hover:text-dark-200 dark:hover:text-light-900"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
