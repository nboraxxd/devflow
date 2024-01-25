import { envConfig } from '@/constants/config'
import mongoose from 'mongoose'

let isConnected: boolean = false


export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!envConfig.mongoDbUri) {
    return console.log('🚦 MongoDB URI not found')
  }

  if (isConnected) {
    return console.log('🛵 Already connected to database')
  }

  try {
    await mongoose.connect(envConfig.mongoDbUri, {
      dbName: 'Devflow'
    })

    isConnected = true

    console.log('🚗 Connected to database')
  } catch (error) {
    console.log('🚧 Error connecting to database: ', error)
  }
}