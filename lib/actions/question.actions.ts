'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { Question } from '@/types'

export async function createQuestion(params: any) {
  try {
    connectToDatabase()
  } catch (error) {}
}
