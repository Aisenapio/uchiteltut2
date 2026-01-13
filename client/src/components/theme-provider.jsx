import React, { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children, attribute = "class", defaultTheme = "system", enableSystem = true, disableTransitionOnChange = false }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored
      return defaultTheme || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      const applyTheme = () => {
        if (disableTransitionOnChange) {
          document.documentElement.style.transition = 'none'
        }
        
        let resolvedTheme = theme
        if (theme === 'system' && enableSystem) {
          resolvedTheme = getSystemTheme()
        }
        
        if (resolvedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        if (disableTransitionOnChange) {
          setTimeout(() => {
            document.documentElement.style.transition = ''
          }, 0)
        }
      }

      localStorage.setItem('theme', theme)
      applyTheme()

      // Если тема "system", слушаем изменения системной темы
      if (theme === 'system' && enableSystem) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
          applyTheme()
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [theme, enableSystem, disableTransitionOnChange])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)