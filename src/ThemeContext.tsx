import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pureswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={dark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

// {/*<SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>*/}

export { ThemeContext, ThemeContextProvider }
