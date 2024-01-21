'use server'

import { ObjectId } from 'mongodb'

import { CreateQuestionReqBody, GetQuestionsParams } from '@/types/question.types'
import { connectToDatabase } from '@/lib/mongoose'
import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'

export async function createQuestion(body: CreateQuestionReqBody) {
  try {
    connectToDatabase()

    const { title, content, author, path } = body

    // Create the tags or get them if they already exist
    const tags = await Promise.all(
      body.tags.map((tag) => {
        return Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
          { $setOnInsert: { name: tag } },
          { upsert: true, new: true }
        )
      })
    )

    const tagIds: ObjectId[] = tags.map((tag) => tag._id)

    // Create the question
    const question = await Question.create({
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

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })
    console.log(
      '🔥 ~ getQuestions ~ questions:',
      questions.map((question) => question.tags)
    )

    return { questions }
  } catch (err) {
    console.log(err)
    throw err
  }
}
