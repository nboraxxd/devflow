import { sidebarLinks } from '@/constants'
import { SheetClose } from '@/components/ui/sheet'
import { LeftSidebarItem } from '@/components/shared/leftSidebar'

export default function MobileNavBody() {
  return (
    <section className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) => (
        <SheetClose asChild key={item.route}>
          <LeftSidebarItem item={item} />
        </SheetClose>
      ))}
    </section>
  )
}
