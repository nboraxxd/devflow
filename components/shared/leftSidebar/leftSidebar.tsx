import { LeftSidebarBody, LeftSidebarFooter } from '@/components/shared/leftSidebar'

export default function LeftSidebar() {
  return (
    <nav className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r px-1.5 pt-[136px] shadow-light-300 dark:shadow-none dark:backdrop-blur-[75%] max-sm:hidden">
      <LeftSidebarBody />

      <LeftSidebarFooter />
    </nav>
  )
}
