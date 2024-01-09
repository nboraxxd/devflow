import { sidebarLinks } from "@/constants";
import { LeftSidebarItem } from "@/components/shared/leftSidebar";

export default function LeftSidebarBody() {
  return (
    <div className="mb-6 flex flex-col gap-6">
      {sidebarLinks.map((item) => (
        <LeftSidebarItem
          key={item.route}
          item={item}
          wrapperClassName="md:px-2.5 gap-2.5"
          textClassName="max-md:hidden"
        />
      ))}
    </div>
  )
}