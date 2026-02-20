import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'
type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red'

interface ThemeConfig {
  mode: ThemeMode
  primaryColor: ThemeColor
}

interface ThemeContextType {
  theme: ThemeConfig
  setTheme: (theme: Partial<ThemeConfig>) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colorMap: Record<ThemeColor, string> = {
  blue: '#1890ff',
  green: '#52c41a',
  purple: '#722ed1',
  orange: '#fa8c16',
  red: '#f5222d',
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('blog-theme')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return { mode: 'light', primaryColor: 'blue' }
      }
    }
    return { mode: 'light', primaryColor: 'blue' }
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      if (theme.mode === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return theme.mode === 'dark'
    }
    setIsDark(checkDark())

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme.mode === 'auto') {
        setIsDark(mediaQuery.matches)
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme.mode])

  useEffect(() => {
    localStorage.setItem('blog-theme', JSON.stringify(theme))
    
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    const color = colorMap[theme.primaryColor]
    root.style.setProperty('--primary-color', color)
  }, [theme, isDark])

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { colorMap }
