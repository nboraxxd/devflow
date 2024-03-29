import * as z from 'zod'

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
})

export const AnswerSchema = z.object({
  content: z.string().min(20),
})

export const MyProfileSchema = z.object({
  name: z.string().min(2).max(64),
  username: z.string().min(4).max(64),
  portfolioWebsite: z.string().url(),
  location: z.string().min(2).max(64),
  bio: z.string().min(4).max(160),
})
