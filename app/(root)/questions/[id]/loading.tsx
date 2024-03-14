import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="py-8 md:py-16">
      {/* Author */}
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="ml-auto h-5 w-1/4" />
      </div>

      <div className="mt-3.5">
        {/* Question */}
        <Skeleton className="h-7 w-full" />
        <Skeleton className="mt-2 h-7 w-2/3" />
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="ml-auto h-6 w-1/4" />
        </div>
        <div className="mt-5">
          {Array.from(Array(6)).map((_, i) => (
            <Skeleton key={i} className="mt-2 h-7 w-full last:w-2/3" />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {Array.from(Array(3)).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20" />
          ))}
        </div>
      </div>

      {/* Answers */}
      <div className="mt-9">
        {/* Filter */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full sm:w-52" />
        </div>

        {/* Author */}
        <div className="mt-5 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 md:mt-8">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="ml-auto h-5 w-1/4" />
        </div>

        {/* Text */}
        <div className="mt-5">
          {Array.from(Array(6)).map((_, i) => (
            <Skeleton key={i} className="mt-2 h-7 w-full last:w-2/3" />
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>
      <Skeleton className="mt-3 h-[350px]" />
      <Skeleton className="ml-auto mt-3 h-12 w-36" />
    </div>
  )
}
