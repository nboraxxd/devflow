import Link from 'next/link'

export default function SubjectTag({ children, count }: { children: string; count?: number }) {
  return (
    <Link
      href="/"
      className="flex-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <div className="flex-center background-light800_dark400 text-light400_light500 subtle-medium min-h-[29px] rounded-md px-4 py-1 uppercase transition-all duration-300 group-hover:!bg-light-700 group-hover:dark:!bg-dark-500">
        {children}
      </div>
      {count && <span className="small-medium text-dark500_light500">{count}</span>}
    </Link>
  )
}
