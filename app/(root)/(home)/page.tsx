import { Question } from '@/types'

import { HomeFilters } from '@/components/home'
import { LinkGradient } from '@/components/shared/button'
import { QuestionCard } from '@/components/shared/cards'
import { NoResult } from '@/components/shared/noResult'

const questions: Question[] = [
  {
    _id: 1,
    title: 'What is the best way to learn React?',
    tags: [
      {
        _id: 1,
        name: 'react',
        count: 1,
        createdAt: new Date('2021-05-01T12:00:00.000Z'),
        updatedAt: new Date('2021-05-01T12:00:00.000Z'),
      },
      {
        _id: 2,
        name: 'javascript',
        count: 1,
        createdAt: new Date('2021-05-01T12:00:00.000Z'),
        updatedAt: new Date('2021-05-01T12:00:00.000Z'),
      },
      {
        _id: 3,
        name: 'frontend',
        count: 1,
        createdAt: new Date('2021-05-01T12:00:00.000Z'),
        updatedAt: new Date('2021-05-01T12:00:00.000Z'),
      },
    ],
    author: {
      _id: 1,
      name: 'Lucile Estrada',
      avatar: '/assets/icons/avatar.svg',
      createdAt: new Date('2021-05-01T12:00:00.000Z'),
      updatedAt: new Date('2021-05-01T12:00:00.000Z'),
    },
    answers: 3,
    upvotes: 10,
    views: 100,
    createdAt: new Date('2021-05-01T12:00:00.000Z'),
    updatedAt: new Date('2021-05-01T12:00:00.000Z'),
  },
  {
    _id: 2,
    title: 'How to improve your coding skills?',
    tags: [
      {
        _id: 4,
        name: 'coding',
        count: 1,
        createdAt: new Date('2022-01-13T09:30:00.000Z'),
        updatedAt: new Date('2022-01-13T09:30:00.000Z'),
      },
      {
        _id: 5,
        name: 'programming',
        count: 1,
        createdAt: new Date('2022-01-13T09:30:00.000Z'),
        updatedAt: new Date('2022-01-13T09:30:00.000Z'),
      },
      {
        _id: 6,
        name: 'learning',
        count: 1,
        createdAt: new Date('2022-01-13T09:30:00.000Z'),
        updatedAt: new Date('2022-01-13T09:30:00.000Z'),
      },
    ],
    author: {
      _id: 2,
      name: 'Ricardo Nguyen',
      avatar: '/assets/icons/avatar.svg',
      createdAt: new Date('2022-01-13T09:30:00.000Z'),
      updatedAt: new Date('2022-01-13T09:30:00.000Z'),
    },
    answers: 5,
    upvotes: 15,
    views: 120,
    createdAt: new Date('2022-01-13T09:30:00.000Z'),
    updatedAt: new Date('2022-01-13T09:30:00.000Z'),
  },
  {
    _id: 3,
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis praesentium animi quisquam minus voluptates magni sint dolorem provident facilis, iusto atque rem eius voluptatibus reprehenderit maxime eaque. Impedit, nobis corporis?',
    tags: [
      {
        _id: 7,
        name: 'machine_learning',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
      {
        _id: 8,
        name: 'image_recognition',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
      {
        _id: 9,
        name: 'deep_learning',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
      {
        _id: 10,
        name: 'neural_networks',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
      {
        _id: 11,
        name: 'computer_vision',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
      {
        _id: 12,
        name: 'data_science',
        count: 1,
        createdAt: new Date('2022-01-13T12:45:00.000Z'),
        updatedAt: new Date('2022-01-13T12:45:00.000Z'),
      },
    ],
    author: {
      _id: 3,
      name: 'Elena Rodriguez',
      avatar: '/assets/icons/avatar.svg',
      createdAt: new Date('2022-01-13T12:45:00.000Z'),
      updatedAt: new Date('2022-01-13T12:45:00.000Z'),
    },
    answers: 8,
    upvotes: 25,
    views: 150,
    createdAt: new Date('2022-01-13T12:45:00.000Z'),
    updatedAt: new Date('2022-01-13T12:45:00.000Z'),
  },
]

// const questions: object[] = []

export default function Home() {
  return (
    <div className="py-8 sm:py-16">
      <div className="flex flex-col-reverse items-start max-sm:gap-2 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <LinkGradient href="/ask-question" className="ml-auto">
          Ask a Question
        </LinkGradient>
      </div>

      <HomeFilters />

      <section className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => <QuestionCard key={question._id} question={question} />)
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the
            next big thing others learn from. Get involved! 💡"
            link='"/ask-question"'
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </div>
  )
}
