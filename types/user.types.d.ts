import { IUser } from '@/database/user.model'

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

export type UpdateUserParams = {
  clerkId: string
  updateData: Partial<IUser>
  path: string
}

export type DeleteUserParams = {
  clerkId: string
}

export type User = {
  _id: string
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
