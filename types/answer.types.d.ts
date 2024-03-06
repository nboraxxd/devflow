export interface CreateAnswerParams {
  content: string
  author: string // User ID
  question: string // Question ID
  path: string
}

export type GetAnswersParams = {
  question: string
  filter?: string
  page?: number
  pageSize?: number
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export type Answer = {
  _id: ObjectId
  content: string
  author: ObjectId
  question: ObjectId
  upvotes: ObjectId[]
  downvotes: ObjectId[]
  createdAt: Date
  updatedAt: Date
  __v: number
}
