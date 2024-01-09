import { LeftSidebarBody, LeftSidebarFooter } from '@/components/shared/leftSidebar'

export default function LeftSidebar() {


  return (
    <nav className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-[89px] flex h-[calc(100vh-89px)] flex-col justify-between overflow-y-auto border-r px-1.5 pt-12 shadow-light-200 dark:shadow-none max-sm:hidden md:top-[101px] md:h-[calc(100vh-101px)] md:w-[185px]">
      <LeftSidebarBody />

      <LeftSidebarFooter />
    </nav>
  )
}