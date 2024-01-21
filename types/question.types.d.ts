// import { ObjectId } from "mongoose"

export type CreateQuestionReqBody = {
  title: string
  content: string
  tags: string[]
  author: string // Schema.Types.ObjectId | IUser
  path: string
}

export type GetQuestionsParams = {
  page?: string
  pageSize?: string
  searchQuery?: string
  filter?: string
}

