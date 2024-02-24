const API = '/api'

export const PATH = {
  HOMEPAGE: '/',
  QUESTIONS: '/questions',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  COMMUNITY: '/community',
  COLLECTION: '/collection',
  JOBS: '/jobs',
  TAGS: '/tags',
  MY_PROFILE: '/my-profile',
  EDIT_PROFILE: '/my-profile/edit',
  PROFILES: '/profiles',
  ASK_QUESTION: '/ask-question',
  API: {
    WEBHOOK: API + '/webhook',
    CHATGPT: API + '/chatgpt',
  },
} as const
