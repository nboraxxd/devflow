import { URLProps } from '@/types'
import { ProfileTemplate } from '@/components/profile'

export default function Page({ params: { id: userId }, searchParams }: URLProps) {
  return <ProfileTemplate userId={userId} pageNumber={searchParams.page ? +searchParams.page : 1} />
}
