'use client'

import { Theme } from '@/constants/enums'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  mode: `${Theme}`
  setMode: Dispatch<SetStateAction<ThemeContextType['mode']>>
}

type ThemeProviderProps = {
  children: ReactNode
  defaultValue?: ThemeContextType
}

const initialThemeContext: ThemeContextType = {
  mode: Theme.LIGHT,
  setMode: () => {},
}

const ThemeContext = createContext<ThemeContextType>(initialThemeContext)

export function ThemeProvider({ children, defaultValue = initialThemeContext }: ThemeProviderProps) {
  const [mode, setMode] = useState(defaultValue.mode)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') as Exclude<Theme, Theme.SYSTEM> | null

    if (
      currentTheme === Theme.DARK ||
      (currentTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setMode('dark')
      document.documentElement.classList.add(Theme.DARK)
    } else {
      setMode('light')
      document.documentElement.classList.remove(Theme.DARK)
    }
  }, [mode])

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
