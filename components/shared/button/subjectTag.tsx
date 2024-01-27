import { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface SubjectTagProps {
  children: ReactNode
  className?: string
  count?: number
}

export default function SubjectTag({ children, className, count }: SubjectTagProps) {
  return (
    <Link
      href="/"
      className={cn(
        'flex-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="flex-center background-light800_dark400 text-light400_light500 subtle-medium h-[29px] rounded-md px-4 py-1 uppercase transition-all duration-300 group-hover:!bg-light-700 group-hover:dark:!bg-dark-500">
        {children}
      </div>
      {count && <span className="small-medium text-dark500_light500">{count}</span>}
    </Link>
  )
}
