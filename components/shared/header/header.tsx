import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Theme } from '@/components/shared/theme'

export default function Header() {
  return (
    <header className="background-light900_dark200 sticky top-0 z-20 shadow-light-300 dark:shadow-none">
      <nav className="flex-between container gap-5 p-5 lg:px-10">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/images/site-logo.svg" width={23} height={23} alt="DevFlow" />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-md:hidden">
            Dev<span className="text-primary-500">flow</span>
          </p>
        </Link>

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

          {/* MobileNav */}
        </div>
      </nav>
    </header>
  )
}
