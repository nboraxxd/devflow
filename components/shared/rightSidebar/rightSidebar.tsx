import { QuestionLink, RightSidebarSection } from '@/components/shared/rightSidebar'
import { SubjectTag } from '@/components/shared/button'

export default function RightSidebar() {
  return (
    <nav className="mt-12 flex flex-col gap-10 max-lg:hidden">
      <RightSidebarSection title="Hot Network">
        <QuestionLink>How to make a div fill a remaining horizontal space?</QuestionLink>
        <QuestionLink>
          Would it be appropriate to point out an error in another paper during a referee report?
        </QuestionLink>
        <QuestionLink>How can an airconditioning machine exist?</QuestionLink>
        <QuestionLink>Interrogated every time crossing UK Border as citizen</QuestionLink>
        <QuestionLink>Low digit addition generator</QuestionLink>
        <QuestionLink>What is an example of 3 numbers that do not make up a vector?</QuestionLink>
        <QuestionLink>How to make a div fill a remaining horizontal space?</QuestionLink>
      </RightSidebarSection>

      <RightSidebarSection title="Popular Tags" childrenWrapperClassName="gap-4">
        <SubjectTag count={120}>Javascript</SubjectTag>
        <SubjectTag count={51}>HTML</SubjectTag>
        <SubjectTag count={224}>React</SubjectTag>
        <SubjectTag count={85}>CSS</SubjectTag>
        <SubjectTag count={45}>Next.js</SubjectTag>
      </RightSidebarSection>
    </nav>
  )
}
