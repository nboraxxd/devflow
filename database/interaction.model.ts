import { Schema, model, models } from 'mongoose'

import { envConfig } from '@/constants/config'

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId
  action: string
  question: Schema.Types.ObjectId
  answer: Schema.Types.ObjectId
  tags: Schema.Types.ObjectId[]
}

const interactionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection, required: true },
    action: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: envConfig.dbQuestionCollection },
    answer: { type: Schema.Types.ObjectId, ref: envConfig.dbAnswerCollection },
    tags: [{ type: Schema.Types.ObjectId, ref: envConfig.dbTagCollection }],
  },
  { timestamps: true }
)

const Interaction =
  models[envConfig.dbInteractionCollection] || model<IInteraction>(envConfig.dbInteractionCollection, interactionSchema)

export default Interaction
