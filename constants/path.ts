const API = '/api'

export const PATH = {
  HOMEPAGE: '/',
  QUESTION_DETAIL: '/question/:id',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  COMMUNITY: '/community',
  COLLECTION: '/collection',
  JOBS: '/jobs',
  TAGS: '/tags',
  TAG_DETAIL: '/tag/:id',
  MY_PROFILE: '/my-profile',
  USER: '/user/:id',
  ASK_QUESTION: '/ask-question',
  API: {
    WEBHOOK: API + '/webhook',
    CHATGPT: API + '/chatgpt',
  },
} as const
