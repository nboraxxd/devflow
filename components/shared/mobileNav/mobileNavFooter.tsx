'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { SheetClose } from '@/components/ui/sheet'
import { AuthButton, LogoutButton } from '@/components/shared/button'

export default function MobileNavFooter() {
  const { isSignedIn, signOut } = useAuth()
  const router = useRouter()

  return (
    <footer className="mt-auto flex flex-col gap-2.5">
      {isSignedIn ? (
        <SheetClose asChild>
          <LogoutButton onClick={() => signOut(() => router.push('/'))}>Logout</LogoutButton>
        </SheetClose>
      ) : (
        <>
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
        </>
      )}
    </footer>
  )
}
