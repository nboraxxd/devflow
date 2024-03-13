import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
        <Skeleton className="h-12 w-full xs:grow" />
        <Skeleton className="h-12 w-full xs:w-52" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from(Array(6)).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-[10px]" />
        ))}
      </div>
    </div>
  )
}
