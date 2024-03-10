import { globalSearchFilters } from '@/constants/filters'

export interface SearchParams {
  query?: string | null
  type?: (typeof globalSearchFilters)[number]['value'] | null
}
