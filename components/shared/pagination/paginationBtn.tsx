'use client'

import { PrimaryButton } from '@/components/shared/button'

interface Props {
  handleNavigate: () => void
  disabled: boolean
  children: React.ReactNode
}

export default function PaginationBtn({ handleNavigate, disabled, children }: Props) {
  return (
    <PrimaryButton
      className="body-medium text-dark400_light800 background-light800_dark300 min-w-[60px] rounded-lg border border-light-700 px-3.5 py-2 shadow-xs dark:border-dark-400"
      disabled={disabled}
      onClick={handleNavigate}
    >
      {children}
    </PrimaryButton>
  )
}
