import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

import { URLQueryParams } from '@/types'
import queryString from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function getTimestamp(createdAt: Date): string {
  const now = new Date()
  const timeDifference = now.getTime() - createdAt.getTime()

  // Define time intervals in milliseconds
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (timeDifference < minute) {
    return 'just now'
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)

    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)

    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day)

    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week)

    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month)

    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  } else {
    const years = Math.floor(timeDifference / year)

    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

export function getJoinedDate(date: Date) {
  // Get the month and year from the Date object
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Join month and year
  const joinedDate = `${month} ${year}`

  return joinedDate
}

export function formUrlQuery({ params, key, value }: URLQueryParams) {
  const currentUrl = queryString.parse(params)

  currentUrl[key] = value

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: { params: string; keysToRemove: string[] }) {
  const currentUrl = queryString.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
