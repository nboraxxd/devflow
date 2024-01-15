import { Question } from '@/components/forms/question'

export default function AskQuestionPage() {
  return (
    <section className="py-8 sm:py-16">
      <h1 className="h1-bold text-dark100_light900">Ask a public quesiton</h1>

      <div className="mt-4 md:mt-9">
        <Question />
      </div>
    </section>
  )
}
