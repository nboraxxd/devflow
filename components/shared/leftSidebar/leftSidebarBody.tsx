import { sidebarLinks } from '@/constants'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function LeftSidebarBody() {
  return (
    <ul className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) => (
        <li key={item.route}>
          <LeftSidebarItem
            item={item}
            wrapperClassName="gap-2.5 md:px-2.5 lg:px-4 xl:px-2.5"
            textClassName=" hidden md:block lg:hidden xl:block"
          />
        </li>
      ))}
    </ul>
  )
}
