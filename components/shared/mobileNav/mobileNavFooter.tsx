import { SignedIn, SignedOut } from '@clerk/nextjs'

import { SheetClose } from '@/components/ui/sheet'
import { AuthButton, LogoutButton } from '@/components/shared/button'

export default function MobileNavFooter() {
  return (
    <footer className="mt-auto flex flex-col gap-2.5">
      <SignedIn>
        <SheetClose asChild>
          <LogoutButton className="">Logout</LogoutButton>
        </SheetClose>
      </SignedIn>

      <SignedOut>
        <SheetClose asChild>
          <AuthButton href="/sign-in" className="btn-secondary">
            <span className="body-semibold primary-text-gradient">Login</span>
          </AuthButton>
        </SheetClose>

        <SheetClose asChild>
          <AuthButton href="/sign-up" className="btn-tertiary light-border-2 body-semibold border">
            Signup
          </AuthButton>
        </SheetClose>
      </SignedOut>
    </footer>
  )
}
