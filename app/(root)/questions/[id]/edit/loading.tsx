import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>

      <div className="mt-4 md:mt-9">
        <div className="space-y-9">
          <div>
            <p className="paragraph-semibold text-dark400_light800">
              Question Title <span className="text-primary-700">*</span>
            </p>
            <Skeleton className="mt-3 h-12" />
            <Skeleton className="mt-2 h-4 w-4/5 rounded-[4px]" />
          </div>

          <div>
            <p className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem? <span className="text-primary-700">*</span>
            </p>
            <Skeleton className="mt-3 h-[350px]" />
            <Skeleton className="mt-2 h-4 w-4/5 rounded-[4px]" />
          </div>

          <div>
            <p className="paragraph-semibold text-dark400_light800">
              Tags <span className="text-primary-700">*</span>
            </p>
            <Skeleton className="mt-3 h-12" />
            <Skeleton className="mt-2 h-4 w-4/5 rounded-[4px]" />
          </div>

          <Skeleton className="ml-auto mt-3 h-12 w-36" />
        </div>
      </div>
    </section>
  )
}
