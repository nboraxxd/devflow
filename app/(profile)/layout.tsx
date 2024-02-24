import { ReactNode } from 'react'

import { Header } from '@/components/shared/header'
import { LeftSidebar } from '@/components/shared/leftSidebar'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container grid min-h-screen sm:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[185px_minmax(0,1fr)]">
        <LeftSidebar />
        <section className="px-10 pt-[88px]">{children}</section>
      </main>
    </>
  )
}
