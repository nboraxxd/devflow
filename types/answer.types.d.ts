export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  questionId: string; // Question ID
  path: string;
}