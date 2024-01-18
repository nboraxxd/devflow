'use server'

import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongoose'

import Question from '@/database/question.model'
import Tag from '@/database/tag.model'

export type QuestionReqBody = {
  title: string
  content: string
  tags: string[]
  author: string
}

export async function createQuestion(body: QuestionReqBody) {
  try {
    connectToDatabase()

    const { title, content, author } = body

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
      author: new ObjectId(author),
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}
