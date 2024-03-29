import type { Metadata } from 'next'

import { SearchParamsProps } from '@/types'
import { TagFilters } from '@/constants/filters'
import { PATH } from '@/constants/path'
import { getAllTags } from '@/lib/actions/tag.action'
import { TagCard } from '@/components/shared/cards'
import { FilterGroup } from '@/components/shared/filter'
import { NoResult } from '@/components/shared/noResult'
import { Pagination } from '@/components/shared/pagination'

export const metadata: Metadata = {
  title: 'Tags | Devflow',
  description: 'Explore and discover tags. Devflow is a community of developers helping each other.',
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5,
  })

  return (
    <div className="py-8 md:py-16">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <FilterGroup inputPlacehoder="Search by tag name..." route={PATH.TAGS} filters={TagFilters} />

      <section className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
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

      {tags.length > 0 && <Pagination pageNumber={searchParams.page ? +searchParams.page : 1} isNext={isNext} />}
    </div>
  )
}
