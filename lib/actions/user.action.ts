import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/mongoose'
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from '@/types/user.types'
import User from '@/database/user.model'
import Question from '@/database/question.model'

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getUserById({ clerkId }: { clerkId: string }) {
  try {
    connectToDatabase()

    const user = await User.findOne({ clerkId })

    return user
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, path, updateData } = userData

    await User.findByIdAndUpdate({ clerkId }, updateData, { new: true })

    revalidatePath(path)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDatabase()

    const { clerkId } = userData

    const user = await User.findOne({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // get user's questions ids
    const userQuestionsIds = await Question.find({ author: user._id }).distinct('_id')

    // delete user's questions
    await Question.deleteMany({ author: user._id })

    // TODO: delete user's answers, comments, etc.

    // delete user
    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (err) {
    console.log(err)
    throw err
  }
}
