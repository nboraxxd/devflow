import { ObjectId } from 'mongodb'

import { User } from '@/types/user.types'
import { Tag } from '@/types'

export type CreateQuestionReqBody = {
  title: string
  content: string
  tags: string[]
  author: string
  path: string
}

export type GetQuestionsParams = {
  page?: string
  pageSize?: string
  searchQuery?: string
  filter?: string
}

export type Question = {
  _id: ObjectId
  title: string
  content: string
  tags: Tag[]
  author: User
  answers: string[]
  upvotes: string[]
  downvotes: string[]
  views: number
  createdAt: Date
  updatedAt: Date
  __v: number
}
