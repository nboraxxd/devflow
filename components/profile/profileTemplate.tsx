import Image from 'next/image'

import { getUserInfo } from '@/lib/actions/user.action'
import { getJoinedDate } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileLink } from '@/components/profile'
import { Stats } from '@/components/shared/stats'

interface Props {
  userId: string
  children?: React.ReactNode
}

export default async function ProfileTemplate({ userId, children }: Props) {
  const { user: userInfo, totalAnswers, totalQuestions } = await getUserInfo(userId)

  return (
    <div className="py-14">
      <div className="flex gap-4 max-md:flex-col-reverse md:items-start md:justify-between">
        <div className="flex gap-4 max-sm:flex-col sm:items-center">
          <div className="max-xs:flex max-xs:justify-center">
            <Image
              src={userInfo.picture}
              alt={userInfo.username}
              width={140}
              height={140}
              className="rounded-full object-cover"
            />
          </div>

          <section>
            {/* Name */}
            <h1 className="h3-bold md:h1-bold text-dark100_light900 line-clamp-1">{userInfo.name}</h1>

            {/* Username */}
            <p className="paragraph-regular text-dark200_light800 mt-2">@{userInfo.username}</p>

            <div className="mt-5 flex items-center gap-5">
              {/* Portfolio website */}
              {userInfo.portfolioWebsite && (
                <ProfileLink
                  iconUrl="/assets/icons/link.svg"
                  iconAlt="User website"
                  href={userInfo.portfolioWebsite}
                  title="Website"
                />
              )}

              {/* Location */}
              {userInfo.location && (
                <ProfileLink iconUrl="/assets/icons/location.svg" iconAlt="User location" title={userInfo.location} />
              )}

              {/* Joined date */}
              <ProfileLink
                iconUrl="/assets/icons/calendar.svg"
                iconAlt="User join"
                title={getJoinedDate(userInfo.createdAt)}
              />
            </div>
          </section>
        </div>

        {/* Edit button */}
        {userInfo.clerkId === userId && children}
      </div>

      {/* Bio */}
      {userInfo.bio && <p>{userInfo.bio}</p>}

      {/* Stats */}
      <Stats totalAnswers={totalAnswers} totalQuestions={totalQuestions} />

      <div className="mt-10 flex">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="p-0">
            <TabsTrigger value="top-posts" className="tab rounded-none rounded-l-lg px-6 py-3 !shadow-none">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab rounded-none rounded-r-lg px-6 py-3 !shadow-none">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reprehenderit!
          </TabsContent>
          <TabsContent value="answers" className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odit voluptates quam repellendus
            consectetur numquam?
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
