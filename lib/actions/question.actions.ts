'use server'

import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'

import {
  CreateQuestionParams,
  GetQuestionsParams,
  Question as QuestionType,
  QuestionVoteParams,
} from '@/types/question.types'
import { connectToDatabase } from '@/lib/mongoose'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'

type GetQuestionByIdReturn = Omit<QuestionType, 'tags' | 'author'> & {
  tags: {
    _id: ObjectId
    name: string
  }[]
  author: {
    _id: ObjectId
    clerkId: string
    name: string
    picture: string
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase()

    const { title, content, author, path } = params

    // Create the tags or get them if they already exist
    const tags = await Promise.all(
      params.tags.map((tag) => {
        return Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
          { $setOnInsert: { name: tag } },
          { upsert: true, new: true }
        )
      })
    )

    const tagIds: ObjectId[] = tags.map((tag) => tag._id)

    // Create the question
    const _question = await Question.create({
      title,
      content,
      tags: tagIds,
      author,
    })

    revalidatePath(path)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getQuestions(_params: GetQuestionsParams) {
  try {
    connectToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getQuestionById(questionId: string): Promise<GetQuestionByIdReturn> {
  try {
    connectToDatabase()

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: '_id clerkId name picture' })

    if (!question) {
      throw new Error('Question not found')
    }

    return question
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase()

    const { questionId, userId, hasDownvoted, hasUpvoted, path } = params

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // TODO: Increment author's reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase()

    const { questionId, userId, hasDownvoted, hasUpvoted, path } = params

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // TODO: Increment author's reputation

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
