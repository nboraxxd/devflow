'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/mongoose'
import { Answer as AnswerType, CreateAnswerParams, GetAnswersParams } from '@/types/answer.types'
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

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase()

    const { question } = params

    const answers = await Answer.find({ question }).populate('author', '_id clerkId name picture')

    return answers as GetAnswersReturn
  } catch (error) {
    console.log(error)
    throw error
  }
}
