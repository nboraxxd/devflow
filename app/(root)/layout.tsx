import { ReactNode } from 'react'

import { Header } from '@/components/shared/header'
import { LeftSidebar } from '@/components/shared/leftSidebar'
import { RightSidebar } from '@/components/shared/rightSidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container grid min-h-screen sm:grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[185px_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[185px_minmax(0,1fr)]">
        <LeftSidebar />

        <section className="grid gap-5 px-5 lg:grid-cols-[1fr_280px]">
          {children}
          <RightSidebar />
        </section>
      </main>
    </>
  )
}
