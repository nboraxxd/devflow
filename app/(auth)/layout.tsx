import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="flex-center min-h-screen w-full">{children}</main>
}
