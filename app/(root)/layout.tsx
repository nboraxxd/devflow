import { ReactNode } from 'react'
import { Header } from '@/components/shared/header'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container grid grid-cols-[164px_minmax(0,1fr)]">
        <nav className="h-[calc(100vh-6.25rem)] max-sm:hidden">LeftSidebar</nav>
        <section className="grid lg:grid-cols-[1fr_300px]">
          <div>{children}</div>
          <div className="flex flex-col gap-10 max-lg:hidden">RightSidebar</div>
        </section>
      </main>
      Toaster
    </>
  )
}
