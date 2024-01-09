import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  children: ReactNode
  childrenWrapperClassName?: string
}

export default function RightSidebarSection({ title, children, childrenWrapperClassName }: Props) {
  return (
    <section className="background-light900_darkgradient rounded-lg p-4 shadow-light-200 dark:shadow-none dark:backdrop-blur-[75%]">
      <h2 className="text-dark200_light900 h3-bold">{title}</h2>
      <div className={cn('mt-6 flex flex-col gap-8', childrenWrapperClassName)}>{children}</div>
    </section>
  )
}
