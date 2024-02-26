import { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface SubjectTagProps {
  children: ReactNode
  href?: string
  className?: string
  count?: number
}

export default function SubjectTag({ children, href, className, count }: SubjectTagProps) {
  return href ? (
    <div
      className={cn(
        'flex-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
    >
      <Link
        href={href}
        className="flex-center background-light800_dark400 text-light400_light500 subtle-medium h-[29px] rounded-md px-4 py-1 uppercase transition-all duration-300 group-hover:!bg-light-700 group-hover:dark:!bg-dark-500"
      >
        {children}
      </Link>
      {count && <span className="small-medium text-dark500_light500">{count}</span>}
    </div>
  ) : (
    <div
      className={cn(
        'flex-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
    >
      <span className="flex-center background-light800_dark400 text-light400_light500 subtle-medium h-[29px] rounded-md px-4 py-1 uppercase transition-all duration-300 group-hover:!bg-light-700 group-hover:dark:!bg-dark-500">
        {children}
      </span>
      {count && <span className="small-medium text-dark500_light500">{count}</span>}
    </div>
  )
}
