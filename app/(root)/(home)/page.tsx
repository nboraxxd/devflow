'use client'

import { LinkGradient } from '@/components/shared/button'
import { HomeFilter } from '@/components/home'

export default function Home() {
  return (
    <div className="pt-8 sm:pt-16">
      <div className="flex flex-col-reverse items-start max-sm:gap-2 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <LinkGradient href="/ask-question" className="ml-auto">
          Ask a Question
        </LinkGradient>
      </div>

      <HomeFilter />
    </div>
  )
}
