import { ParamsProps } from '@/types'
import { ProfileTemplate } from '@/components/profile'

export default function Page({ params: { id: userId } }: ParamsProps) {
  return <ProfileTemplate userId={userId} />
}
