import { cn } from '@/lib/utils'

interface Props<V> {
  label: string
  value: V
  handleClickFilter: (item: Props<V>['value']) => void
  childrenClassName: string
  isActive?: boolean
  buttonClassName?: string
}

export default function FilterButton<T>(props: Props<T>) {
  const { label, isActive, buttonClassName, handleClickFilter, value, childrenClassName } = props

  return (
    <button
      className={cn(
        'flex-center min-h-[42px] rounded-lg bg-light-800 px-6 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:bg-dark-300',
        {
          'bg-primary-100 dark:bg-dark-400': isActive,
          'hover:bg-light-700 hover:dark:bg-dark-400 transition duration-300': !isActive,
        },
        buttonClassName
      )}
      onClick={() => handleClickFilter(value)}
    >
      <span className={childrenClassName}>
        {label}
      </span>
    </button>
  )
}
