import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="py-8 md:py-16">
      <Skeleton className="h-12 w-1/3" />

      <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
        <Skeleton className="h-12 w-full xs:grow" />
        <Skeleton className="h-12 w-full xs:w-52" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {Array.from(Array(6)).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[10px]" />
        ))}
      </div>
    </div>
  )
}
