import { PATH } from '@/constants/path'
import { getAllUsers } from '@/lib/actions/user.action'
import { UserCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'

export default async function Page() {
  const { users } = await getAllUsers({})

  return (
    <div className="py-8 sm:py-16">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <FilterGroup />

      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={JSON.stringify(user._id)} clerkId={user.clerkId} name={user.name} picture={user.picture} username={user.username} />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Join the conversation! 🚀 Sign up now to be part of our community and start sharing ideas. Don't miss out! 💡"
            link={PATH.SIGN_UP}
            linkTitle="Sign up now"
          />
        )}
      </section>
    </div>
  )
}
