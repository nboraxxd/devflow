import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { LinkGradient } from '@/components/shared/button'

interface NoResultProps {
  title: string
  description: string
  link: string
  linkTitle: string
}

export default function NoResult({ title, description, link, linkTitle }: NoResultProps) {
  return (
    <div className="flex-center mt-4 w-full flex-col gap-7 md:mt-8">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="h-[200px] w-[270px] object-contain dark:hidden"
        priority
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden h-[200px] w-[270px] object-contain dark:block"
      />

      <section className="flex flex-col gap-3.5">
        <h2 className="h2-bold text-dark200_light900 text-center max-xs:!text-xl">
          <Balancer>{title}</Balancer>
        </h2>
        <p className="body-regular text-dark500_light700 text-center">
          <Balancer>{description}</Balancer>
        </p>
        <LinkGradient href={link} className="mx-auto min-w-[173px] justify-center">
          {linkTitle}
        </LinkGradient>
      </section>
    </div>
  )
}
