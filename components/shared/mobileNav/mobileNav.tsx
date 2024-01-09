import Image from 'next/image'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { MobileNavBody, MobileNavFooter } from '@/components/shared/mobileNav'

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 custom-scrollbar flex flex-col gap-0 overflow-y-auto border-none px-5 pb-9 pt-4"
      >
        <DevflowLogo wrapperClassName="w-fit px-2 -mx-2" textClassName="max-md:block" />

        <div className="mt-16 flex grow flex-col">
          <MobileNavBody />

          <MobileNavFooter />
        </div>
      </SheetContent>
    </Sheet>
  )
}
