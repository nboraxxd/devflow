import { Document, Schema, models, model } from 'mongoose'
import validator from 'validator'

import {
  EMAIL_MESSAGES,
  PASSWORD_MESSAGES,
  PICTURE_MESSAGES,
  PORTFOLIO_WEBSITE_MESSAGES,
  USERNAME_MESSAGES,
} from '@/constants/message'
import { envConfig } from '@/constants/config'

export interface IUser extends Document {
  clerkId: string
  name: string
  username: string
  email: string
  picture: string
  password?: string
  bio?: string
  location?: string
  portfolioWebsite?: string
  reputation?: number
  saved: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true },
    name: { type: String, trim: true, required: true },
    username: {
      type: String,
      trim: true,
      required: [true, USERNAME_MESSAGES.IS_REQUIRED],
      unique: true,
      validate: [
        {
          validator: (username: string) => !username.includes(' '),
          message: USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPACE,
        },
      ],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, EMAIL_MESSAGES.IS_REQUIRED],
      unique: true,
      validate: [validator.isEmail, EMAIL_MESSAGES.INVALID],
    },
    picture: {
      type: String,
      required: [true, PICTURE_MESSAGES.IS_REQUIRED],
      validate: [validator.isURL, PICTURE_MESSAGES.INVALID],
    },
    password: {
      type: String,
      validate: [
        {
          validator: (password: string) => validator.isLength(password, { min: 6, max: 64 }),
          message: PASSWORD_MESSAGES.LENGTH,
        },
        {
          validator: (password: string) =>
            validator.isStrongPassword(password, { minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
          message: PASSWORD_MESSAGES.IS_STRONG,
        },
      ],
    },
    bio: { type: String },
    location: { type: String },
    portfolioWebsite: { type: String, validate: [validator.isURL, PORTFOLIO_WEBSITE_MESSAGES.INVALID] },
    reputation: { type: Number, default: 0 },
    saved: [{ type: Schema.Types.ObjectId, ref: envConfig.dbQuestionCollection }],
  },
  { timestamps: true }
)

const User = models[envConfig.dbUserCollection] || model<IUser>(envConfig.dbUserCollection, userSchema)

export default User
