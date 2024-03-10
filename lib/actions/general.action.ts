'use server'

import { SearchParams } from '@/types/general.types'
import { globalSearchFilters } from '@/constants/filters'
import { capitalizeFirstLetter } from '@/lib/utils'
import { connectToDatabase } from '@/lib/mongoose'
import Question from '@/database/question.model'
import Answer from '@/database/answer.model'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'

const searchableTypes = globalSearchFilters.map((filter) => filter.value)

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase()

    const { query, type } = params
    const regexQuery = { $regex: query, $options: 'i' }

    let results = []

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ] as const

    if (!type || !searchableTypes.includes(type)) {
      // If no type is specified, search in all models
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResult = await model.find({ [searchField]: regexQuery }).limit(3)

        results.push(
          ...queryResult.map((item) => ({
            id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id,
            title: type === 'answer' ? `Answers containing ${query}` : type === 'tag' ? capitalizeFirstLetter(item[searchField]) : item[searchField],
            type,
          }))
        )
      }
    } else {
      // Search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type)

      if (!modelInfo) {
        throw new Error('Invalid type')
      }

      const queryResult = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(12)

      results = queryResult.map((item) => ({
        id: type === 'user' ? item.clerkId : type === 'answer' ? item.question : item._id,
        title: type === 'answer' ? `Answers containing ${query}` : item[modelInfo.searchField],
        type,
      }))
    }

    return JSON.stringify(results)
  } catch (error) {
    console.log(`Error fetching global search: ${error}`)
    throw error
  }
}
