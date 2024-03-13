import { SearchParamsProps } from '@/types'
import { PATH } from '@/constants/path'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { UserCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

export default async function Page({ searchParams }: SearchParamsProps) {
  const { users, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20,
  })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <FilterGroup inputPlacehoder="Search by username..." route={PATH.COMMUNITY} filters={UserFilters} />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={JSON.stringify(user._id)}
              _id={user._id.toString()}
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
      </div>

      {users.length > 0 && <Pagination isNext={isNext} pageNumber={searchParams?.page ? +searchParams.page : 1} />}
    </div>
  )
}
