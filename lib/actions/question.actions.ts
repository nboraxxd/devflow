'use server'

import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import { FilterQuery, SortOrder } from 'mongoose'

import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionsParams,
  Question as QuestionType,
  QuestionVoteParams,
  RecommendedParams,
} from '@/types/question.types'
import { connectToDatabase } from '@/lib/mongoose'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import Interaction from '@/database/interaction.model'
import Answer from '@/database/answer.model'

export type GetQuestionByIdReturn = Omit<QuestionType, 'tags' | 'author'> & {
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

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    })

    // Create the tags or get them if they already exist
    const tags = await Promise.all(
      params.tags.map((tag) => {
        return Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
          { $setOnInsert: { name: tag }, $push: { questions: question._id } },
          { upsert: true, new: true }
        )
      })
    )

    const tagIds: ObjectId[] = tags.map((tag) => tag._id)

    // Update the question's tags field using $push and $each
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagIds } },
    })

    // Create an interaction record for the user's ask_question action
    await Interaction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagIds,
    })

    // Increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase()

    const { questionId, title, content, path } = params

    await Question.findByIdAndUpdate(questionId, { title, content }, { new: true })

    revalidatePath(path)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getQuestions(
  params: GetQuestionsParams
): Promise<{ questions: GetQuestionByIdReturn[]; isNext: boolean }> {
  try {
    connectToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 20 } = params

    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof Question> = {}

    let sortOptions: Record<string, SortOrder> = { createdAt: -1 }

    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 }
        break
      case 'frequent':
        sortOptions = { views: -1 }
        break
      case 'recommended':
        sortOptions = { answers: -1 }
        break
      case 'unanswered':
        query.answers = { $size: 0 }
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

    const [questions, totalQuestions] = await Promise.all([
      Question.find(query)
        .populate({ path: 'tags', model: Tag, select: '_id name' })
        .populate({ path: 'author', model: User, select: '_id clerkId name picture' })
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize),
      Question.countDocuments(query),
    ])

    const isNext = totalQuestions > skipAmount + questions.length

    return { questions: questions as GetQuestionByIdReturn[], isNext }
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

export async function getTopQuestions(): Promise<QuestionType[]> {
  try {
    connectToDatabase()

    const topQuestions = await Question.find({}).sort({ views: -1, upvotes: -1 }).limit(5)

    return topQuestions
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

    // Increment user's reputation by +1/-1 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasUpvoted ? -1 : 1 } })
    // Increment author's reputation by +10/-10 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasUpvoted ? -5 : 5 } })

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

    // Increment user's reputation by +1/-1 for downvoting/revoking a downvote to the question
    await User.findByIdAndUpdate(userId, { $inc: { reputation: hasDownvoted ? -1 : 1 } })
    // Increment author's reputation by -2/2 for downvoting/revoking an downvote to the question
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: hasDownvoted ? 2 : -2 } })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabase()

    const { userId, page = 1, pageSize = 20, searchQuery } = params

    // find user
    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error('user not found')
    }

    const skipAmount = (page - 1) * pageSize

    // Find the user's interactions
    const userInteractions = await Interaction.find({ user: user._id }).populate('tags').exec()

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags)
      }
      return tags
    }, [])

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...new Set(userTags.map((tag: any) => tag._id)),
    ]

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
        { author: { $ne: user._id } }, // Exclude user's own questions
      ],
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } },
      ]
    }

    const totalQuestions = await Question.countDocuments(query)

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: 'tags',
        model: Tag,
      })
      .populate({
        path: 'author',
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize)

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length

    return { questions: recommendedQuestions, isNext }
  } catch (error) {
    console.error('Error getting recommended questions:', error)
    throw error
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase()

    const { questionId, path } = params

    // Delete the question
    await Question.deleteOne({ _id: questionId })

    // Delete all answers associated with the question
    await Answer.deleteMany({ question: questionId })

    // Delete interactions related to the question
    await Interaction.deleteMany({ question: questionId })

    // Update tags to remove references to the deleted question
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } })

    revalidatePath(path)
  } catch (error) {
    console.error('Error deleting question:', error)
    throw error
  }
}
