import { envConfig } from '@/constants/config'
import { Document, Model, Schema, models, model } from 'mongoose'

export interface ITag extends Document {
  name: string
  description: string
  questions: Schema.Types.ObjectId[]
  followers: Schema.Types.ObjectId[]
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, trim: true, lowercase: true, required: true, unique: true },
    questions: [{ type: Schema.Types.ObjectId, ref: envConfig.dbQuestionCollection }],
    followers: [{ type: Schema.Types.ObjectId, ref: envConfig.dbUserCollection }],
  },
  { timestamps: { createdAt: true } }
)

const Tag: Model<ITag> = models[envConfig.dbTagCollection] || model<ITag>(envConfig.dbTagCollection, TagSchema)

export default Tag
