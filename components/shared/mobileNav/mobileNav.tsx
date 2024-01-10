import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { MobileNavBody, MobileNavFooter } from '@/components/shared/mobileNav'

export default function MobileNav({ hamburgerClassName }: { hamburgerClassName?: string }) {
  return (
    <Sheet>
      <SheetTrigger className={cn('sm:hidden', hamburgerClassName)}>
        <Image src="/assets/icons/hamburger.svg" width={36} height={36} alt="Menu" className="invert-colors" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 custom-scrollbar flex flex-col gap-0 overflow-y-auto border-none px-5 pb-9 pt-4"
      >
        <header>
          <DevflowLogo wrapperClassName="-mx-2 w-fit px-2" textClassName="max-md:block" />
        </header>

        <section className="mt-16 grow">
          <MobileNavBody />
        </section>
        <MobileNavFooter />
      </SheetContent>
    </Sheet>
  )
}
