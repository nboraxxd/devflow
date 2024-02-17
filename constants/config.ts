export const envConfig = {
  tinyEditorApiKey: process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY as string,
  mongoDbUri: process.env.MONGODB_URI,
  nextClerkWebhookSecret: process.env.NEXT_CLERK_WEBHOOK_SECRET as string,
  dbQuestionCollection: process.env.DB_QUESTION_COLLECTION as string,
  dbUserCollection: process.env.DB_USER_COLLECTION as string,
  dbTagCollection: process.env.DB_TAG_COLLECTION as string,
  dbAnswerCollection: process.env.DB_ANSWER_COLLECTION as string,
  dbInteractionCollection: process.env.DB_INTERACTION_COLLECTION as string,
}
