'use server'

import { GetAllTagsParams, GetTopInteractedTagsParams } from '@/types/tag.types'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'

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

export async function getAllTags(_params: GetAllTagsParams) {
  try {
    connectToDatabase()

    const tags = await Tag.find({})

    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}
