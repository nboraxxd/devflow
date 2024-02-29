import { Tag } from '@/types/tag.types'
import { Question } from '@/types/question.types'
import { PATH } from '@/constants/path'
import { SubjectTag } from '@/components/shared/button'
import { QuestionLink, RightSidebarSection } from '@/components/shared/rightSidebar'

interface Props {
  questions?: Pick<Question, '_id' | 'title'>[]
  tags: Pick<Tag, '_id' | 'name' | 'questions'>[]
}

export default function RightSidebar({ questions, tags }: Props) {
  return (
    <nav className="mt-12 flex flex-col gap-10 max-lg:hidden">
      {questions && (
        <RightSidebarSection title="Top questions">
          {questions.map((question) => (
            <QuestionLink key={question._id.toString()} id={question._id.toString()}>
              {question.title}
            </QuestionLink>
          ))}
        </RightSidebarSection>
      )}

      <RightSidebarSection title="Popular tags" childrenWrapperClassName="gap-4">
        {tags.map((tag) => (
          <SubjectTag key={tag._id.toString()} count={tag.questions.length} href={`${PATH.TAGS}/${tag._id}`}>
            {tag.name}
          </SubjectTag>
        ))}
      </RightSidebarSection>
    </nav>
  )
}
