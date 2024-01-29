import { authMiddleware } from '@clerk/nextjs'
import { PATH } from '@/constants/path'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    PATH.HOMEPAGE,
    PATH.API.WEBHOOK,
    PATH.TAGS,
    `${PATH.TAGS}/:id`,
    `${PATH.USERS}/:id`,
    `${PATH.QUESTIONS}/:id`,
    PATH.COMMUNITY,
    PATH.JOBS,
  ],
  ignoredRoutes: [PATH.API.WEBHOOK, PATH.API.CHATGPT],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
