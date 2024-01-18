import { Document, Schema, models, model, Model } from 'mongoose'

import { envConfig } from '@/constants/config'

export interface IQuestion extends Document {
  title: string
  content: string
  tags: Schema.Types.ObjectId[]
  author: Schema.Types.ObjectId
  views: number
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
  answers: Schema.Types.ObjectId[]
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection },
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  },
  { timestamps: true }
)

const Question: Model<IQuestion> =
  models[envConfig.dbQuestionCollection] || model<IQuestion>(envConfig.dbQuestionCollection, QuestionSchema)

export default Question
