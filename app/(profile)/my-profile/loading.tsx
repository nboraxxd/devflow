import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="py-14">
      <div className="flex items-center gap-4 max-sm:flex-col">
        <Skeleton className="h-[120px] w-[120px] shrink-0 rounded-full object-cover md:h-[140px] md:w-[140px]" />
        <div className="max-sm:flex-center w-full max-sm:flex-col">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="mt-2 h-6 w-1/4" />
          <Skeleton className="mt-5 h-6 w-1/2" />
          <Skeleton className="mt-5 h-6 w-1/2" />
        </div>
      </div>

      <div className="mt-10 w-full">
        <h2 className="h3-semibold text-dark200_light900">Stats</h2>
        <div className="mt-5 grid gap-5 xs:grid-cols-2 lg:grid-cols-4">
          {Array.from(Array(4)).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-5 xl:gap-10">
        <div>
          <Skeleton className="h-11 w-1/3" />
          {Array.from(Array(3)).map((_, i) => (
            <Skeleton key={i} className="mt-6 h-48 w-full rounded-[10px]" />
          ))}
        </div>
        <div className="max-lg:hidden">
          <h2 className="h3-bold text-dark200_light900 pt-2">Top Tags</h2>
          <div className="mt-6 flex flex-col gap-4">
            {Array.from(Array(5)).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
