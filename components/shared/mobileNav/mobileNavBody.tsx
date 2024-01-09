import { sidebarLinks } from '@/constants'
import { SheetClose } from '@/components/ui/sheet'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function MobileNavBody() {
  return (
    <ul className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) => (
        <li key={item.route}>
          <SheetClose asChild>
            <LeftSidebarItem item={item} />
          </SheetClose>
        </li>
      ))}
    </ul>
  )
}
