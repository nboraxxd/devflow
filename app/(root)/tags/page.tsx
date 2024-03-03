import { SearchParamsProps } from '@/types'
import { TagFilters } from '@/constants/filters'
import { PATH } from '@/constants/path'
import { getAllTags } from '@/lib/actions/tag.action'
import { TagCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'

export default async function Page({ searchParams }: SearchParamsProps) {
  const { tags } = await getAllTags({ searchQuery: searchParams.q })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <FilterGroup inputPlacehoder="Search by tag name..." route={PATH.TAGS} filters={TagFilters} />

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagCard key={tag._id.toString()} _id={tag._id.toString()} name={tag.name} count={tag.questions.length} />
          ))
        ) : (
          <NoResult
            title="There's no tag to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the
          next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </div>
  )
}
