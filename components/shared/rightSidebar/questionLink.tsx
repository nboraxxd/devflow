import Link from 'next/link'
import Image from 'next/image'

export default function QuestionLink({ children }: { children: string }) {
  return (
    <Link
      href="/"
      className="flex items-start justify-between gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <h3 className="text-dark500_light700 body-medium">{children}</h3>
      <Image
        src="assets/icons/chevron-right.svg"
        alt="chevron right"
        width={20}
        height={20}
        className="invert-colors"
      />
    </Link>
  )
}
