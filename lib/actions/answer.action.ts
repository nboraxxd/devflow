'use server'

import { revalidatePath } from 'next/cache'
import { SortOrder } from 'mongoose'

import { connectToDatabase } from '@/lib/mongoose'
import { Answer as AnswerType, AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from '@/types/answer.types'
import { User } from '@/types/user.types'
import Answer from '@/database/answer.model'
import Question from '@/database/question.model'

type GetAnswersReturn = (Omit<AnswerType, 'author'> & {
  author: Pick<User, '_id' | 'clerkId' | 'name' | 'picture'>
})[]

export async function createAnswer(params: CreateAnswerParams) {
  connectToDatabase()

  const { author, content, path, question } = params

  try {
    const newAnswer = await Answer.create({ content, author, question })

    await Question.findByIdAndUpdate(
      question,
      {
        $push: { answers: newAnswer._id },
      },
      { new: true }
    )

    // TODO: Add interaction...

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAnswers(params: GetAnswersParams): Promise<{ answers: GetAnswersReturn; isNext: boolean }> {
  try {
    connectToDatabase()

    const { question, filter, page = 1, pageSize = 20 } = params

    let sortOptions: Record<string, SortOrder> = {}

    switch (filter) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 }
        break
      case 'lowestUpvotes':
        sortOptions = { upvotes: 1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'old':
        sortOptions = { createdAt: 1 }
        break

      default:
        break
    }

    const skipAmount = (page - 1) * pageSize

    const [answers, totalAnswers] = await Promise.all([
      Answer.find({ question })
        .populate('author', '_id clerkId name picture')
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize),
      Answer.countDocuments({ question }),
    ])

    const isNext = totalAnswers > skipAmount + answers.length

    return { answers: answers as GetAnswersReturn, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  const { userId, answerId, hasDownvoted, hasUpvoted, path } = params

  try {
    connectToDatabase()

    let updateQuery = {}

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $addToSet: { upvotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }

    // TODO: Increment author's reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  const { userId, answerId, hasDownvoted, hasUpvoted, path } = params

  try {
    connectToDatabase()

    let updateQuery = {}

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }

    // TODO: Increment author's reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
