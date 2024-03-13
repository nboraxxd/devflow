'use server'

import { ObjectId } from 'mongodb'
import { FilterQuery, SortOrder } from 'mongoose'

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
import Interaction from '@/database/interaction.model'

export type GetTopPopularTagReturn = {
  _id: ObjectId
  name: string
  numberOfQuestions: number
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams): Promise<TagType[]> {
  try {
    connectToDatabase()

    const { userId, limit = 2 } = params

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Find interactions for the user and group by tags
    const tagCountMap = await Interaction.aggregate([
      { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ])

    const topTags = tagCountMap.map((tagCount) => tagCount._id)

    // Find the tag documents for the top tags
    const topTagDocuments = await Tag.find({ _id: { $in: topTags } })

    return topTagDocuments
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllTags(params: GetAllTagsParams): Promise<{ tags: TagType[]; isNext: boolean }> {
  try {
    connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 20 } = params

    const query: FilterQuery<typeof Tag> = searchQuery ? { name: { $regex: new RegExp(searchQuery, 'i') } } : {}

    const skipAmount = (page - 1) * pageSize

    let sortOptions: Record<string, SortOrder> = { createdAt: -1 }

    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'name':
        sortOptions = { name: 1 }
        break
      case 'old':
        sortOptions = { createdAt: 1 }
        break

      default:
        break
    }

    const [tags, totalTags] = await Promise.all([
      Tag.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize),
      Tag.countDocuments(query),
    ])

    const isNext = totalTags > skipAmount + tags.length

    return { tags, isNext }
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

    const { tagId, searchQuery, filter, page = 1, pageSize = 20 } = params

    const query: FilterQuery<typeof Question> = {}

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { content: { $regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    let sortOptions: Record<string, SortOrder> = { createdAt: -1 }

    switch (filter) {
      case 'popular':
        sortOptions = { views: -1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'name':
        sortOptions = { title: 1 }
        break
      case 'old':
        sortOptions = { createdAt: 1 }
        break

      default:
        break
    }

    const skipAmount = (page - 1) * pageSize

    const tag = await Tag.findById(tagId).populate({
      path: 'questions',
      model: Question,
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    // Extract the questions from the tag
    const questions = tag.questions.slice(0, pageSize) as GetQuestionByIdReturn[]

    // Calculate the isNext indicator
    const isNext = tag.questions.length > pageSize

    return { tagTitle: tag.name as string, questions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}
