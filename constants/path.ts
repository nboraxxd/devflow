const API = '/api'

export const PATH = {
  HOMEPAGE: '/',
  QUESTION_DETAIL: '/question',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  COMMUNITY: '/community',
  COLLECTION: '/collection',
  JOBS: '/jobs',
  TAGS: '/tags',
  MY_PROFILE: '/my-profile',
  USERS: '/users',
  ASK_QUESTION: '/ask-question',
  API: {
    WEBHOOK: API + '/webhook',
    CHATGPT: API + '/chatgpt',
  },
} as const
