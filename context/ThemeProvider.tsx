'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  mode: 'light' | 'dark'
  setMode: Dispatch<SetStateAction<ThemeContextType['mode']>>
}

type ThemeProviderProps = {
  children: ReactNode
  defaultValue?: ThemeContextType
}

const initialThemeContext: ThemeContextType = {
  mode: 'light',
  setMode: () => {},
}

const ThemeContext = createContext<ThemeContextType>(initialThemeContext)

export function ThemeProvider({ children, defaultValue = initialThemeContext }: ThemeProviderProps) {
  const [mode, setMode] = useState(defaultValue.mode)

  // useEffect(() => {
  //   if (mode === 'dark') {
  //     setMode('light')
  //     document.documentElement.classList.add('light')
  //   } else {
  //     setMode('dark')
  //     document.documentElement.classList.add('dark')
  //   }
  // }, [mode])

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
