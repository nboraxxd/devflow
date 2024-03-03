'use server'

import { ObjectId } from 'mongodb'
import { FilterQuery } from 'mongoose'

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
  Tag as TagType,
} from '@/types/tag.types'
import { connectToDatabase } from '@/lib/mongoose'
import { GetQuestionByIdReturn } from '@/lib/actions/question.actions'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'
import Question from '@/database/question.model'

export type GetTopPopularTagReturn = {
  _id: ObjectId
  name: string
  numberOfQuestions: number
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase()

    const { userId } = params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: '123', name: 'HTML' },
      { _id: '234', name: 'CSS' },
      { _id: '345', name: 'JavaScript' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllTags(params: GetAllTagsParams): Promise<{ tags: TagType[] }> {
  try {
    connectToDatabase()

    const { searchQuery } = params

    const query: FilterQuery<typeof Tag> = searchQuery ? { name: { $regex: new RegExp(searchQuery, 'i') } } : {}

    const tags = await Tag.find(query)

    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase()

    const popularTags = await Tag.aggregate<GetTopPopularTagReturn>([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 10 },
    ])

    return popularTags
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    const { tagId, searchQuery } = params

    const query: FilterQuery<typeof Question> = {}

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    const tag = await Tag.findById(tagId).populate({
      path: 'questions',
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const questions = tag.questions as GetQuestionByIdReturn[]

    return { tagTitle: tag.name as string, questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}
