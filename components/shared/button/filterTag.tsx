import { cn } from '@/lib/utils'

interface Props {
  children: string
  isActive?: boolean
  className?: string
}

export default function FilterTag({ children, isActive, className }: Props) {
  return (
    <button
      className={cn(
        'flex-center min-h-[42px] rounded-lg bg-light-800 px-6 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:bg-dark-300',
        {
          'bg-primary-100 dark:bg-dark-400': isActive,
          'hover:bg-light-700 hover:dark:bg-dark-400 transition duration-300': !isActive,
        },
        className
      )}
    >
      <span className={cn('body-medium text-light-500', { 'primary-text-gradient': isActive })}>{children}</span>
    </button>
  )
}
