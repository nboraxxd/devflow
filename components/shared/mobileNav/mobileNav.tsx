import Image from 'next/image'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { DevflowLogo } from '@/components/shared/devflowLogo'
import { MobileNavContent } from '@/components/shared/mobileNav'

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
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
        className="background-light900_dark200 custom-scrollbar flex flex-col overflow-y-auto border-none px-5 pb-9 pt-4"
      >
        <DevflowLogo wrapClassName="w-fit px-2 -mx-2" textClassName="max-md:block" />

        <div className="mt-20 flex grow flex-col">
          <MobileNavContent />

          <SignedOut>
            <div className="mt-auto flex flex-col gap-2.5">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="btn-secondary min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="body-semibold primary-text-gradient">Login</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="btn-tertiary light-border-2 min-h-[42px] w-full rounded-lg border px-4 py-3 shadow-none">
                    <span className="body-semibold">Signup</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  )
}
