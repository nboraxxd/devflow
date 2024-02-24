interface Props {
  totalAnswers: number
  totalQuestions: number
}

export default function Stats({ totalAnswers, totalQuestions }: Props) {
  return (
    <div className="mt-10 w-full">
      <h2 className="h3-semibold text-dark200_light900">Stats</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-[repeat(4,_minmax(0px,_257px))]">
        <div className="shadow-light100_dark200 background-light900_dark200 grid grid-cols-2 items-center justify-between rounded-[10px] border border-light-b px-11 py-6 dark:border-dark-300">
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalQuestions}</span>
            <span className="text-dark400_light700 body-medium block">Questions</span>
          </div>
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalAnswers}</span>
            <span className="text-dark400_light700 body-medium block">Answers</span>
          </div>
        </div>

        <div className="shadow-light100_dark200 background-light900_dark200 flex items-center gap-5 rounded-[10px] border border-light-b px-11 py-6 dark:border-dark-300">
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalQuestions}</span>
            <span className="text-dark400_light700 body-medium block">Questions</span>
          </div>
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalAnswers}</span>
            <span className="text-dark400_light700 body-medium block">Answers</span>
          </div>
        </div>

        <div className="shadow-light100_dark200 background-light900_dark200 flex items-center gap-5 rounded-[10px] border border-light-b px-11 py-6 dark:border-dark-300">
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalQuestions}</span>
            <span className="text-dark400_light700 body-medium block">Questions</span>
          </div>
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalAnswers}</span>
            <span className="text-dark400_light700 body-medium block">Answers</span>
          </div>
        </div>

        <div className="shadow-light100_dark200 background-light900_dark200 flex items-center gap-5 rounded-[10px] border border-light-b px-11 py-6 dark:border-dark-300">
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalQuestions}</span>
            <span className="text-dark400_light700 body-medium block">Questions</span>
          </div>
          <div>
            <span className="text-dark200_light900 paragraph-semibold block">{totalAnswers}</span>
            <span className="text-dark400_light700 body-medium block">Answers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
