import { IUser } from '@/database/user.model'
import { ObjectId } from 'mongodb'

export type CreateUserParams = {
  clerkId: string
  name: string
  username: string
  email: string
  picture: string
}

export type GetAllUsersParams = {
  page?: number
  pageSize?: number
  filter?: string
  searchQuery?: string
}

export interface ToggleSaveQuestionParams {
  userId: string
  questionId: string
  path: string
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export type UpdateUserParams = {
  clerkId: string
  updateData: Partial<IUser>
  path: string
}

export type DeleteUserParams = {
  clerkId: string
}

export type User = {
  _id: ObjectId
  clerkId: string
  name: string
  username: string
  email: string
  picture: string
  reputation: number
  saved: string[]
  password?: string
  bio?: string
  location?: string
  portfolioWebsite?: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
