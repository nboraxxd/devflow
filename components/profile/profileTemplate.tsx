import Image from 'next/image'

import { PATH } from '@/constants/path'
import { getUserInfo } from '@/lib/actions/user.action'
import { getAllTags } from '@/lib/actions/tag.action'
import { getJoinedDate } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileLink } from '@/components/profile'
import { Stats } from '@/components/shared/stats'
import { QuestionsTab } from '@/components/shared/questionsTab'
import { SubjectTag } from '@/components/shared/button'
import { AnswersTab } from '@/components/shared/answersTab'

interface Props {
  userId: string
  children?: React.ReactNode
}

export default async function ProfileTemplate({ userId, children }: Props) {
  const { user: userInfo, totalAnswers, totalQuestions } = await getUserInfo(userId)
  const { tags } = await getAllTags({})

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

      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-5 xl:gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="p-0">
            <TabsTrigger value="top-posts" className="tab rounded-none rounded-l-lg px-6 py-3 !shadow-none">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab rounded-none rounded-r-lg px-6 py-3 !shadow-none">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-6 flex w-full flex-col gap-6">
            <QuestionsTab userId={userId} />
          </TabsContent>
          <TabsContent value="answers" className="mt-6 flex w-full flex-col gap-6">
            <AnswersTab userId={userId} />
          </TabsContent>
        </Tabs>
        <section className="max-lg:hidden">
          <h2 className="h3-bold text-dark200_light900 pt-2">Top Tags</h2>
          <div className="mt-6 flex flex-col gap-4">
            {tags.map((tag) => (
              <SubjectTag key={tag._id.toString()} count={tag.questions.length} href={`${PATH.TAGS}/${tag._id}`}>
                {tag.name}
              </SubjectTag>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
