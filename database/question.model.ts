import { Document, Schema, models, model } from 'mongoose'

import { envConfig } from '@/constants/config'
import { ITag } from './tag.model'

export interface IQuestion extends Document {
  title: string
  content: string
  tags: ITag[]
  author: Schema.Types.ObjectId
  views: number
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
  answers: Schema.Types.ObjectId[]
}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: envConfig.dbTagCollection }],
    author: { type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection },
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    answers: [{ type: Schema.Types.ObjectId, ref: envConfig.dbAnswerCollection }],
  },
  { timestamps: true }
)

const Question =
  models[envConfig.dbQuestionCollection] || model<IQuestion>(envConfig.dbQuestionCollection, questionSchema)

export default Question
