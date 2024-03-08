'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { PaginationBtn } from '@/components/shared/pagination'
import { formUrlQuery } from '@/lib/utils'

interface Props {
  pageNumber: number
  isNext: boolean
}

export default function Pagination({ pageNumber, isNext }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleNavigate(direction: 'prev' | 'next') {
    const newPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: newPageNumber.toString(),
    })

    router.push(newUrl)
  }

  if (!isNext && pageNumber === 1) return null

  return (
    <div className="mt-9 border-t border-t-light-800 pt-5 dark:border-t-dark-300">
      <div className="flex items-center justify-center gap-5">
        <PaginationBtn handleNavigate={() => handleNavigate('prev')} disabled={pageNumber <= 1}>
          Prev
        </PaginationBtn>
        <div className="text-light900_dark400 primary-gradient flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg px-3 py-1">
          {pageNumber}
        </div>
        <PaginationBtn handleNavigate={() => handleNavigate('next')} disabled={!isNext}>
          Next
        </PaginationBtn>
      </div>
    </div>
  )
}
