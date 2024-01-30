'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/mongoose'
import { CreateAnswerParams } from '@/types/answer.types'
import Answer from '@/database/answer.model'
import Question from '@/database/question.model'

export async function createAnswer(params: CreateAnswerParams) {
  connectToDatabase()

  const { author, content, path, question } = params

  try {
    const newAnswer = await Answer.create({ content, author, question })

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    })

    // TODO: Add interaction...

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
