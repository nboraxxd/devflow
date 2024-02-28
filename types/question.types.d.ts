import { ObjectId } from 'mongodb'

import { User } from '@/types/user.types'

export type CreateQuestionParams = {
  title: string
  content: string
  tags: string[]
  author: string
  path: string
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export type GetQuestionsParams = {
  page?: string
  pageSize?: string
  searchQuery?: string
  filter?: string
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export type Question = {
  _id: ObjectId
  title: string
  content: string
  tags: Tag[]
  author: User
  answers: string[]
  upvotes: ObjectId[]
  downvotes: ObjectId[]
  views: number
  createdAt: Date
  updatedAt: Date
  __v: number
}
