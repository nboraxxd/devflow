import { SignedIn, UserButton } from '@clerk/nextjs'

import { DevflowLogo } from '@/components/shared/devflowLogo'
import { Theme } from '@/components/shared/theme'
import { MobileNav } from '@/components/shared/mobileNav'

export default function Header() {
  return (
    <header className="background-light900_dark200 sticky top-0 z-20 shadow-light-300 dark:shadow-none">
      <nav className="flex-between container gap-5 p-5 lg:px-10">
        <DevflowLogo />

        <p>GlobalSearch</p>

        <div className="flex-between gap-5">
          <Theme />
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'h-10 w-10',
                },
                variables: {
                  colorPrimary: '#FF7000',
                },
              }}
            />
          </SignedIn>

          <MobileNav />
        </div>
      </nav>
    </header>
  )
}
