import { IUser } from '@/database/user.model'

export type CreateUserParams = {
  clerkId: string
  name: string
  username: string
  email: string
  picture: string
}

export type UpdateUserParams = {
  clerkId: string
  updateData: Partial<IUser>
  path: string
}

export type DeleteUserParams = {
  clerkId: string
}
