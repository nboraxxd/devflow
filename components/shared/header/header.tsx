import { SignedIn, UserButton } from '@clerk/nextjs'

import { DevflowLogo } from '@/components/shared/devflowLogo'
import { Theme } from '@/components/shared/header'
import { MobileNav } from '@/components/shared/mobileNav'
import { PrimarySearch } from '@/components/shared/search'

export default function Header() {
  return (
    <header className="background-light900_dark200 light-border sticky top-0 z-20 border-b shadow-light-header dark:shadow-none">
      <nav className="flex-between container gap-5 px-5 py-6 lg:px-10">
        <DevflowLogo />

        <PrimarySearch
          iconSrc="/assets/icons/search.svg"
          iconAlt="Search"
          placeholder="Search anything globally"
          wrapperClassName="max-w-[600px] max-md:hidden"
        />

        <div className="flex-between shrink-0 gap-5">
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
