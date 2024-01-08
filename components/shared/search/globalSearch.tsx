import Image from 'next/image'

import { Input } from '@/components/ui/input'

export default function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-md:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[52px] grow items-center gap-3 rounded-xl border border-light-700 px-4">
        <Image src="/assets/icons/search.svg" alt="Search" width={24} height={24} className="cursor-pointer" />
        <Input
          type="text"
          placeholder="Search anything globally"
          className="paragraph-regular no-focus placeholder border-none bg-transparent px-0 shadow-none outline-none"
        />
      </div>
    </div>
  )
}
