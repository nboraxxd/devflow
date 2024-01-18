import { SidebarLink } from '@/types'
import { Theme } from '@/constants/enums'
import { PATH } from '@/constants/path'
import { capitalizeFirstLetter } from '@/lib/utils'

export const themes = [
  {
    value: Theme.LIGHT,
    label: capitalizeFirstLetter(Theme.LIGHT),
    icon: '/assets/icons/sun.svg',
  },
  { value: Theme.DARK, label: capitalizeFirstLetter(Theme.DARK), icon: '/assets/icons/moon.svg' },
  { value: Theme.SYSTEM, label: capitalizeFirstLetter(Theme.SYSTEM), icon: '/assets/icons/computer.svg' },
] as const

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: PATH.HOMEPAGE,
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: PATH.COMMUNITY,
    label: 'Community',
  },
  {
    imgURL: '/assets/icons/star.svg',
    route: PATH.COLLECTION,
    label: 'Collections',
  },
  {
    imgURL: '/assets/icons/suitcase.svg',
    route: PATH.JOBS,
    label: 'Find Jobs',
  },
  {
    imgURL: '/assets/icons/tag.svg',
    route: PATH.TAGS,
    label: 'Tags',
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: PATH.PROFILE,
    label: 'Profile',
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: PATH.ASK_QUESTION,
    label: 'Ask a question',
  },
]

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
} as const
