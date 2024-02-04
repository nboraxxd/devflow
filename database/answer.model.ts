import { Document, Schema, models, model } from 'mongoose'

import { envConfig } from '@/constants/config'

export interface IAnswer extends Document {
  content: string
  author: Schema.Types.ObjectId
  questionId: Schema.Types.ObjectId
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
}

const answerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: envConfig.dbQuestionCollection, required: true },
    upvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
  },
  { timestamps: true }
)

const Answer = models[envConfig.dbAnswerCollection] || model<IAnswer>(envConfig.dbAnswerCollection, answerSchema)

export default Answer
