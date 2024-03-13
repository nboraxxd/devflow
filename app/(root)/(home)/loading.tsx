import { PATH } from '@/constants/path'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkGradient } from '@/components/shared/button'

export default function Loading() {
  return (
    <div className="py-8 md:py-16">
      {/* Heading */}
      <div className="flex flex-col-reverse items-start max-sm:gap-2 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <LinkGradient href={PATH.ASK_QUESTION} className="ml-auto">
          Ask a Question
        </LinkGradient>
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
        <Skeleton className="h-12 w-full xs:grow" />
        <Skeleton className="h-12 w-full xs:w-[170px] md:hidden" />
      </div>
      <div className="mt-8 flex gap-3 max-md:hidden">
        {Array.from(Array(4)).map((_, i) => (
          <Skeleton key={i} className="h-12 w-28" />
        ))}
      </div>

      {/* Questions */}
      <section className="mt-10 flex w-full flex-col gap-6">
        {Array.from(Array(6)).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[10px]" />
        ))}
      </section>
    </div>
  )
}
