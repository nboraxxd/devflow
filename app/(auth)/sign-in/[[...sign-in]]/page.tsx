import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Sign In | Devflow',
  description: 'Sign in to Devflow. Devflow is a community of developers helping each other.',
}

export default function Page() {
  return <SignIn />
}
