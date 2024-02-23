import { useAuth } from '@clerk/nextjs'

import { sidebarLinks } from '@/constants'
import { PATH } from '@/constants/path'
import { SheetClose } from '@/components/ui/sheet'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function MobileNavBody() {
  const { userId } = useAuth()

  return (
    <ul className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) =>
        item.route !== PATH.MY_PROFILE || (item.route === PATH.MY_PROFILE && userId) ? (
          <li key={item.route}>
            <SheetClose asChild>
              <LeftSidebarItem item={item} />
            </SheetClose>
          </li>
        ) : null
      )}
    </ul>
  )
}
