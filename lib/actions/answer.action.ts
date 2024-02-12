'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/mongoose'
import { CreateAnswerParams } from '@/types/answer.types'
import Answer from '@/database/answer.model'
import Question from '@/database/question.model'

export async function createAnswer(params: CreateAnswerParams) {
  connectToDatabase()

  const { author, content, path, questionId } = params

  try {
    const newAnswer = await Answer.create({ content, author, question: questionId })

    await Question.findByIdAndUpdate(
      questionId,
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
