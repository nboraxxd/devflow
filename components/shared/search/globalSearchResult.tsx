import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Url } from 'next/dist/shared/lib/router/router'
import { useEffect, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useAuth } from '@clerk/nextjs'
import { m } from 'framer-motion'

import { ServiceStatus } from '@/constants/enums'
import { globalSearch } from '@/lib/actions/general.action'
import { globalSearchFilters } from '@/constants/filters'
import { GlobalSearchFilters } from '@/components/shared/search'
import { PATH } from '@/constants/path'

export default function GlobalSearchResult() {
  const searchParams = useSearchParams()
  const { userId } = useAuth()

  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)
  const [result, setResult] = useState([])

  const globalSearchParams = searchParams.get('global')
  const typeSearchParams = searchParams.get('type') as (typeof globalSearchFilters)[number]['value'] | null

  function renderLink(text: string, id: string): Url {
    switch (text) {
      case 'question':
        return `${PATH.QUESTIONS}/${id}`
      case 'answer':
        return `${PATH.QUESTIONS}/${id}`
      case 'user':
        return id === userId ? PATH.MY_PROFILE : `${PATH.PROFILES}/${id}`
      case 'tag':
        return `${PATH.TAGS}/${id}`
      default:
        return '/'
    }
  }

  useEffect(() => {
    if (!globalSearchParams) return
    ;(async function fetchSearchResult() {
      try {
        setResult([])
        setStatus(ServiceStatus.pending)

        const res = await globalSearch({ query: globalSearchParams, type: typeSearchParams })
        setResult(JSON.parse(res))

        setStatus(ServiceStatus.successful)
      } catch (error) {
        setStatus(ServiceStatus.rejected)
        console.log(error)
        throw error
      }
    })()
  }, [globalSearchParams, typeSearchParams])

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.1 }}
      className="background-light800_dark400 absolute left-0 top-full z-10 mt-3 max-h-[350px] w-full overflow-y-auto rounded-[10px] pb-8 pt-6 shadow-search dark:shadow-none md:max-h-[515px]"
    >
      <GlobalSearchFilters />

      <div className="background-light700_dark500 my-6 h-px w-full" />

      <span className="base-bold text-dark400_light800 px-6">Top Match</span>
      {(status === ServiceStatus.idle || status === ServiceStatus.pending) && (
        <div className="flex-center flex-col gap-3.5">
          <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
          <p className="text-dark200_light900 body-regular">Browsing the whole database...</p>
        </div>
      )}

      {status === ServiceStatus.rejected && (
        <div className="flex-center flex-col gap-3.5">
          <Image src="assets/icons/shy-face.svg" alt="Shy face" width={40} height={40} className="my-2 h-10 w-10" />
          <p className="text-dark200_light900 body-regular">Oops, no results found</p>
        </div>
      )}

      {status === ServiceStatus.successful &&
        (result.length > 0 ? (
          <div className="mt-[18px] space-y-2">
            {result.map(
              (item: { id: string; title: string; type: (typeof globalSearchFilters)[number]['value'] }, index) => (
                <Link
                  key={item.title + item.id + index}
                  href={renderLink(item.type, item.id)}
                  className="flex w-full items-start gap-3.5 px-6 py-[9px] hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="Tag"
                    width={20}
                    height={20}
                    className="invert-colors h-5 w-5 max-md:hidden"
                  />
                  <div>
                    <h2 className="paragraph-semibold text-dark200_light900 line-clamp-1">{item.title}</h2>
                    <h3 className="body-semibold mt-1.5 line-clamp-1 capitalize text-light-500">{item.type}</h3>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <div className="flex-center flex-col gap-3.5">
            <Image src="assets/icons/shy-face.svg" alt="Shy face" width={40} height={40} className="my-2 h-10 w-10" />
            <p className="text-dark200_light900 body-regular">Oops, no results found</p>
          </div>
        ))}
    </m.div>
  )
}
