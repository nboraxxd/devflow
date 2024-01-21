export const envConfig = {
  tinyEditorApiKey: process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY as string,
  mongoDbUri: process.env.MONGODB_URI,
  dbQuestionCollection: process.env.DB_QUESTION_COLLECTION as string,
  dbUserCollection: process.env.DB_USER_COLLECTION as string,
  dbTagCollection: process.env.DB_TAG_COLLECTION as string,
  webhookSecret: process.env.WEBHOOK_SECRET as string,
  
}
