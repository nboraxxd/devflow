import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Sign Up | Devflow',
  description: 'Sign up to Devflow. Devflow is a community of developers helping each other.',
}

export default function Page() {
  return <SignUp />
}
