export type CreateAnswerParams = {
  content: string
  author: string // User ID
  questionId: string // Question ID
  path: string
}

export type GetAnswersParams = {
  questionId: string
  sortBy?: string
  page?: number
  pageSize?: number
}

export type Answer = {
  _id: ObjectId
  content: string
  author: ObjectId
  questionId: ObjectId
  upvotes: ObjectId[]
  downvotes: ObjectId[]
  createdAt: Date
  updatedAt: Date
  __v: number
}
