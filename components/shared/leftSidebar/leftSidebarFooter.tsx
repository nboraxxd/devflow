import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'

import { AuthButton, LogoutButton } from '@/components/shared/button'

export default function LeftSidebarFooter() {
  return (
    <footer className="mb-8 flex flex-col gap-2.5">
      <SignedIn>
        <LogoutButton>
          <Image
            src="/assets/icons/logout.svg"
            alt="Logout"
            width={24}
            height={24}
            className="invert-colors md:hidden"
          />
          <span className="body-medium max-md:hidden">Logout</span>
        </LogoutButton>
      </SignedIn>

      <SignedOut>
        <AuthButton href="/sign-in" className="btn-secondary">
          <Image
            src="/assets/icons/account.svg"
            alt="Login"
            width={24}
            height={24}
            className="invert-colors md:hidden"
          />
          <span className="body-semibold primary-text-gradient max-md:hidden">Login</span>
        </AuthButton>
        
        <AuthButton href="/sign-up" className="btn-tertiary light-border-2 border">
          <Image
            src="/assets/icons/sign-up.svg"
            alt="Signup"
            width={24}
            height={24}
            className="invert-colors md:hidden"
          />
          <span className="body-semibold max-md:hidden">Signup</span>
        </AuthButton>
      </SignedOut>
    </footer>
  )
}