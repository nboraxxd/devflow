import { ReactNode } from 'react'

import { getTopQuestions } from '@/lib/actions/question.actions'
import { getAllTags } from '@/lib/actions/tag.action'
import { Header } from '@/components/shared/header'
import { LeftSidebar } from '@/components/shared/leftSidebar'
import { RightSidebar } from '@/components/shared/rightSidebar'

export default async function Layout({ children }: { children: ReactNode }) {
  const topQuestions = await getTopQuestions()
  const { tags } = await getAllTags({})

  return (
    <>
      <Header />
      <main className="container grid min-h-screen sm:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[185px_minmax(0,1fr)]">
        <LeftSidebar />

        <section className="grid gap-5 px-5 pt-[88px] lg:grid-cols-[1fr_280px]">
          {children}
          <RightSidebar questions={topQuestions} tags={tags} />
        </section>
      </main>
    </>
  )
}
