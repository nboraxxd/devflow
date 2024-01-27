import { sidebarLinks } from '@/constants'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function LeftSidebarBody() {
  return (
    <ul className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) => (
        <li key={item.route}>
          <LeftSidebarItem
            item={item}
            wrapperClassName="gap-2.5 max-xl:justify-center xl:px-2.5"
            textClassName="hidden xl:block"
          />
        </li>
      ))}
    </ul>
  )
}
