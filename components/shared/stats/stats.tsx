import { formatNumberToSocialStyle } from '@/lib/utils'
import { StatsCard } from '@/components/shared/stats'
import { BAGDE_CARDS } from '@/constants'

interface Props {
  totalAnswers: number
  totalQuestions: number
}

export default function Stats({ totalAnswers, totalQuestions }: Props) {
  return (
    <div className="mt-10 w-full">
      <h2 className="h3-semibold text-dark200_light900">Stats</h2>

      <div className="mt-5 grid gap-5 xs:grid-cols-2 lg:grid-cols-4">
        <div className="shadow-light100_dark200 background-light900_dark200 flex items-center justify-evenly gap-3 rounded-[10px] border border-light-b px-3 py-6 dark:border-dark-300 sm:px-6 md:gap-5 xl:px-11">
          <div className="shrink-0">
            <span className="text-dark200_light900 paragraph-semibold block">
              {formatNumberToSocialStyle(totalQuestions)}
            </span>
            <span className="text-dark400_light700 body-medium block">Questions</span>
          </div>
          <div className="shrink-0">
            <span className="text-dark200_light900 paragraph-semibold block">
              {formatNumberToSocialStyle(totalAnswers)}
            </span>
            <span className="text-dark400_light700 body-medium block">Answers</span>
          </div>
        </div>

        {BAGDE_CARDS.map((badge) => (
          <StatsCard key={badge.type} iconUrl={badge.iconUrl} title={badge.title} value={1500} />
        ))}
      </div>
    </div>
  )
}
