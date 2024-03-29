'use server'

import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import { FilterQuery, SortOrder } from 'mongoose'

import { connectToDatabase } from '@/lib/mongoose'
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  User as UserType,
} from '@/types/user.types'
import { BadgeCounts, CriteriaType } from '@/types'
import { Answer as AnswerType } from '@/types/answer.types'
import { GetQuestionByIdReturn } from '@/lib/actions/question.actions'
import { envConfig } from '@/constants/config'
import { assignBadges } from '@/lib/utils'
import User from '@/database/user.model'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'
import Tag from '@/database/tag.model'

export type GetUserInfoReturn = {
  user: UserType
  totalQuestions: number
  totalAnswers: number
  badgeCounts: BadgeCounts
}

type GetSavedQuestionsReturn = {
  savedQuestions: GetQuestionByIdReturn[]
  isNext: boolean
}

type GetUserQuestionsReturn = {
  questions: GetQuestionByIdReturn[]
  isNext: boolean
}

export type AnswerReturnType = Omit<AnswerType, 'author' | 'question'> & {
  author: {
    _id: ObjectId
    clerkId: string
    name: string
    picture: string
  }
  question: {
    _id: ObjectId
    title: string
  }
}

type GetUserAnswersReturn = {
  answers: AnswerReturnType[]
  isNext: boolean
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

export async function getAllUsers(params: GetAllUsersParams): Promise<{ users: UserType[]; isNext: boolean }> {
  try {
    connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 20 } = params

    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof User> = {}

    let sortOptions: Record<string, SortOrder> = { createdAt: -1 }

    if (filter) {
      switch (filter) {
        case 'new_users':
          sortOptions = { createdAt: -1 }
          break
        case 'old_users':
          sortOptions = { createdAt: 1 }
          break
        case 'top_contributors':
          sortOptions = { reputation: -1 }
          break

        default:
          break
      }
    }

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    const [users, totalUsers] = await Promise.all([
      User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize),
      User.countDocuments(query),
    ])

    const isNext = totalUsers > skipAmount + users.length

    return { users, isNext }
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

    const [totalQuestions, totalAnswers, [questionUpvotes], [answerUpvotes], [questionViews]] = await Promise.all([
      Question.countDocuments({ author: user._id }),
      Answer.countDocuments({ author: user._id }),
      Question.aggregate([
        { $match: { author: user._id } },
        { $project: { _id: 0, upvotes: { $size: '$upvotes' } } },
        { $group: { _id: null, totalUpvotes: { $sum: '$upvotes' } } },
      ]),
      Answer.aggregate([
        { $match: { author: user._id } },
        { $project: { _id: 0, upvotes: { $size: '$upvotes' } } },
        { $group: { _id: null, totalUpvotes: { $sum: '$upvotes' } } },
      ]),
      Question.aggregate([{ $match: { author: user._id } }, { $group: { _id: null, totalViews: { $sum: '$views' } } }]),
    ])

    const criteriaList: CriteriaType[] = [
      { type: 'QUESTION_COUNT', count: totalQuestions },
      { type: 'ANSWER_COUNT', count: totalAnswers },
      { type: 'QUESTION_UPVOTES', count: questionUpvotes?.totalUpvotes || 0 },
      { type: 'ANSWER_UPVOTES', count: answerUpvotes?.totalUpvotes || 0 },
      { type: 'TOTAL_VIEWS', count: questionViews?.totalViews || 0 },
    ]

    const badgeCounts = assignBadges(criteriaList)

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
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

export async function getSavedQuestions(params: GetSavedQuestionsParams): Promise<GetSavedQuestionsReturn> {
  try {
    connectToDatabase()

    const { clerkId, searchQuery, filter, page = 1, pageSize = 20 } = params

    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof Question> = {}

    let sortOptions: Record<string, SortOrder> = { createdAt: -1 }

    switch (filter) {
      case 'most_recent':
        sortOptions = { createdAt: -1 }
        break
      case 'oldest':
        sortOptions = { createdAt: 1 }
        break
      case 'most_voted':
        sortOptions = { upvotes: -1 }
        break
      case 'most_viewed':
        sortOptions = { views: -1 }
        break
      case 'most_answered':
        sortOptions = { answers: -1 }
        break

      default:
        break
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    const users = await User.findOne({ clerkId }).populate({
      path: 'saved',
      model: envConfig.dbQuestionCollection,
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: envConfig.dbTagCollection, select: '_id name' },
        { path: 'author', model: envConfig.dbUserCollection, select: '_id clerkId name picture' },
      ],
    })

    if (!users) {
      throw new Error('User not found')
    }

    // Extract the saved questions from the user
    const savedQuestions = users.saved.slice(0, pageSize)

    // Calculate the isNext indicator
    const isNext = users.saved.length > pageSize

    return { savedQuestions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions(params: GetUserStatsParams): Promise<GetUserQuestionsReturn> {
  try {
    connectToDatabase()

    const { userId, page = 1, pageSize = 20 } = params

    const skipAmount = (page - 1) * pageSize

    const user = await User.findOne({ clerkId: userId })

    const [userQuestions, totalUserQuestions] = await Promise.all([
      Question.find({ author: user._id })
        .sort({ createdAt: -1, view: -1, upvotes: -1 })
        .populate({ path: 'tags', model: Tag, select: '_id name' })
        .populate({ path: 'author', model: User, select: '_id clerkId name picture' })
        .skip(skipAmount)
        .limit(pageSize),
      Question.countDocuments({ author: user._id }),
    ])

    const isNext = totalUserQuestions > skipAmount + userQuestions.length

    return { questions: userQuestions as GetQuestionByIdReturn[], isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserAnswers(params: GetUserStatsParams): Promise<GetUserAnswersReturn> {
  try {
    connectToDatabase()

    const { userId, page = 1, pageSize = 20 } = params

    const skipAmount = (page - 1) * pageSize

    const user = await User.findOne({ clerkId: userId })

    const [userAnswers, totalUserAnswers] = await Promise.all([
      Answer.find({ author: user._id })
        .sort({ createdAt: -1, upvotes: -1 })
        .populate({ path: 'question', model: Question, select: '_id title' })
        .populate({ path: 'author', model: User, select: '_id clerkId name picture' })
        .skip(skipAmount)
        .limit(pageSize),
      Answer.countDocuments({ author: user._id }),
    ])

    const isNext = totalUserAnswers > skipAmount + userAnswers.length

    return { answers: userAnswers as AnswerReturnType[], isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, path, updateData } = params

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
