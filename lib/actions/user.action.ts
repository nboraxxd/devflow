'use server'

import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import { FilterQuery } from 'mongoose'

import { connectToDatabase } from '@/lib/mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  User as UserType,
} from '@/types/user.types'
import { GetQuestionByIdReturn } from '@/lib/actions/question.actions'
import { envConfig } from '@/constants/config'
import User from '@/database/user.model'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'

export type GetUserInfoReturn = {
  user: UserType
  totalQuestions: number
  totalAnswers: number
}

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

export async function getAllUsers(_params: GetAllUsersParams) {
  try {
    connectToDatabase()

    // const { page = 1, pageSize = 20, filter, searchQuery } = params

    const users = await User.find({}).sort({ createdAt: -1 })

    return { users }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserByClerkId(clerkId: string): Promise<UserType> {
  try {
    connectToDatabase()

    const user = await User.findOne({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getUserInfo(userId: string): Promise<GetUserInfoReturn> {
  try {
    connectToDatabase()

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('User not found')
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })

    return {
      user,
      totalQuestions,
      totalAnswers,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase()

    const { userId, questionId, path } = params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const isQuestionSaved = user.saved.includes(new ObjectId(questionId))

    if (isQuestionSaved) {
      // Remove the question from the saved list
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } }, { new: true })
    } else {
      // Add the question to the saved list
      await User.findByIdAndUpdate(userId, { $addToSet: { saved: questionId } }, { new: true })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase()

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params

    const query: FilterQuery<typeof Question> = searchQuery ? { title: { $regex: new RegExp(searchQuery, 'i') } } : {}

    const users = await User.findOne({ clerkId }).populate({
      path: 'saved',
      model: envConfig.dbQuestionCollection,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: envConfig.dbTagCollection, select: '_id name' },
        { path: 'author', model: envConfig.dbUserCollection, select: '_id clerkId name picture' },
      ],
    })

    if (!users) {
      throw new Error('User not found')
    }

    const savedQuestions = users.saved as unknown as GetQuestionByIdReturn[]

    return { savedQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, path, updateData } = userData

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

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
    const _userQuestionsIds = await Question.find({ author: user._id }).distinct('_id')

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
