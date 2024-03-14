import { PATH } from '@/constants/path'
import { SubjectTag } from '@/components/shared/button'

interface TagCardProps {
  _id: string
  name: string
  count: number
}

export default function TagCard({ _id, name, count }: TagCardProps) {
  return (
    <section className="shadow-light100_darknone background-light900_dark200 flex w-full flex-col items-center rounded-[10px] border border-light-b px-7 py-10 dark:border-dark-300">
      <SubjectTag
        href={`${PATH.TAGS}/${_id}`}
        className="text-dark500_light500 body-regular mt-1.5 line-clamp-1 break-all"
      >
        {name}
      </SubjectTag>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="body-semibold primary-text-gradient">{count}</span>
        <span className="small-medium text-dark400_light500 mb-px">Questions</span>
      </div>
    </section>
  )
}
