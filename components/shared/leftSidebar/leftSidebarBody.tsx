import { auth } from '@clerk/nextjs'

import { sidebarLinks } from '@/constants'
import { PATH } from '@/constants/path'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function LeftSidebarBody() {
  const { userId } = auth()

  return (
    <ul className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) =>
        item.route !== PATH.MY_PROFILE || (item.route === PATH.MY_PROFILE && userId) ? (
          <li key={item.route}>
            <LeftSidebarItem
              item={item}
              wrapperClassName="gap-2.5 max-xl:justify-center xl:px-2.5"
              textClassName="hidden xl:block"
            />
          </li>
        ) : null
      )}
    </ul>
  )
}
