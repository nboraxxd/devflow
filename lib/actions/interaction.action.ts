'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ViewQuestionParams } from '@/types/interaction.types'
import Question from '@/database/question.model'
import Interaction from '@/database/interaction.model'

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase()

    const { questionId, userId } = params

    const question = await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })

    if (!question) {
      console.log('Question not found')
      return
    }

    if (userId) {
      const existingInteraction = await Interaction.findOne({ user: userId, question: questionId, action: 'view' })

      if (existingInteraction) {
        console.log('User has already viewed this question')
        return
      }

      await Interaction.create({ user: userId, question: questionId, tags: question.tags, action: 'view' })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
