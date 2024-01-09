'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { sidebarLinks } from '@/constants'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'
import { AuthButton, LogoutButton } from '@/components/shared/button'

export default function LeftSidebar() {
  const { isSignedIn, signOut } = useAuth()
  const router = useRouter()

  return (
    <nav className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-[89px] flex h-[calc(100vh-89px)] flex-col justify-between overflow-y-auto border-r px-1.5 pt-12 shadow-light-200 dark:shadow-none max-sm:hidden md:top-[101px] md:h-[calc(100vh-101px)] md:w-[185px]">
      <div className="mb-6 flex flex-col gap-6">
        {sidebarLinks.map((item) => (
          <LeftSidebarItem
            key={item.route}
            item={item}
            wrapperClassName="md:px-2.5 gap-2.5"
            textClassName="max-md:hidden"
          />
        ))}
      </div>

      <footer className="mb-8 flex flex-col gap-2.5">
        {isSignedIn ? (
          <LogoutButton onClick={() => signOut(() => router.push('/'))}>
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
              className="invert-colors md:hidden"
            />
            <span className="body-medium max-md:hidden">Logout</span>
          </LogoutButton>
        ) : (
          <>
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
          </>
        )}
      </footer>
    </nav>
  )
}
