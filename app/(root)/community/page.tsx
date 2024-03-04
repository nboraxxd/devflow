import { SearchParamsProps } from '@/types'
import { PATH } from '@/constants/path'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { UserCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'

export default async function Page({ searchParams }: SearchParamsProps) {
  const { users } = await getAllUsers({ searchQuery: searchParams.q, filter: searchParams.filter })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <FilterGroup inputPlacehoder="Search by username..." route={PATH.COMMUNITY} filters={UserFilters} />

      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={JSON.stringify(user._id)}
              _id={user._id}
              clerkId={user.clerkId}
              name={user.name}
              picture={user.picture}
              username={user.username}
            />
          ))
        ) : (
          <NoResult
            title="There's no user to show"
            description="Join the community! 🚀 Sign up now to be part of our community and start sharing ideas. Don't miss out! 💡"
            link={PATH.SIGN_UP}
            linkTitle="Sign up now"
          />
        )}
      </section>
    </div>
  )
}
