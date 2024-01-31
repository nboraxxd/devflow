import { Document, Schema, models, model, Model } from 'mongoose'

import { envConfig } from '@/constants/config'

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId
  questionId: Schema.Types.ObjectId
  content: string
  upvotes: Schema.Types.ObjectId[]
  downvotes: Schema.Types.ObjectId[]
}

const answerSchema = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: envConfig.dbQuestionCollection, required: true },
    content: { type: String, required: true },
    upvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
  },
  { timestamps: true }
)

const Answer = (models[envConfig.dbAnswerCollection] ||
  model<IAnswer>(envConfig.dbAnswerCollection, answerSchema)) as Model<IAnswer>

export default Answer
