import { Schema } from "mongoose"

export type CreateQuestionReqBody = {
  title: string
  content: string
  tags: string[]
  author: Schema.Types.ObjectId // | IUser
  path: string
}

export type GetQuestionsParams = {
  page?: string
  pageSize?: string
  searchQuery?: string
  filter?: string
}

