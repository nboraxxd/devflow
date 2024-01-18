import { connectToDatabase } from '@/lib/mongoose'
import User from '@/database/user.model'

export async function getUserById({ clerkId }: { clerkId: string }) {
  try {
    connectToDatabase()

    const user = await User.findOne({ clerkId })

    return user
  } catch (err) {
    console.log(err)
  }
}
