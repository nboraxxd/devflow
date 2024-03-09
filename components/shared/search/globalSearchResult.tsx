import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { m } from 'framer-motion'

import { PATH } from '@/constants/path'
import { ServiceStatus } from '@/constants/enums'
import { GlobalSearchFilters } from '@/components/shared/search'
import { Url } from 'next/dist/shared/lib/router/router'

export default function GlobalSearchResult() {
  const searchParms = useSearchParams()

  const [status, setStatus] = useState<ServiceStatus>(ServiceStatus.idle)

  const globalSearchParams = searchParms.get('global')
  const typeSearchParams = searchParms.get('type')

  function renderLink(text: string, id: string): Url {
    return ''
  }

  useEffect(() => {
    // eslint-disable-next-line
    ;(async function fetchSearchResult() {
      try {
        setStatus(ServiceStatus.pending)
        console.log({ globalSearchParams, typeSearchParams })
        setStatus(ServiceStatus.successful)
      } catch (error) {
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
      className="background-light800_dark400 absolute left-0 top-full z-10 mt-3 max-h-[350px] w-full overflow-y-scroll rounded-[10px] pb-8 pt-6 shadow-search dark:shadow-none md:max-h-[515px]"
    >
      <GlobalSearchFilters />

      <div className="background-light700_dark500 my-6 h-px w-full" />

      <span className="base-bold text-dark400_light800 px-6">Top Match</span>
      {status === ServiceStatus.pending ? (
        <div className="flex-center flex-col gap-3.5">
          <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
          <p className="text-dark200_light900 body-regular">Browsing the whole database...</p>
        </div>
      ) : (
        <div className="mt-[18px] space-y-2">
          {Array.from(Array(10)).map((_, i) => (
            <Link
              key={i}
              href={renderLink('text', 'id')}
              className="flex w-full items-start gap-3.5 px-6 py-[9px] hover:bg-light-700/50 dark:hover:bg-dark-500/50"
            >
              <Image src="/assets/icons/tag.svg" alt="Tag" width={20} height={20} className="invert-colors h-5 w-5" />
              <div>
                <h2 className="paragraph-semibold text-dark200_light900 line-clamp-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestias rerum blanditiis nihil
                  sapiente quod mollitia tenetur. Facere, eos doloribus?
                </h2>
                <h3 className="body-semibold mt-1.5 line-clamp-1 text-light-500">Question</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </m.div>
  )
}
