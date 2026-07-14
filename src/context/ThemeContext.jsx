import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => null,
})

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme-dark')
      if (saved !== null) {
        return saved === 'true'
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return false // Force light mode as default
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    try {
      localStorage.setItem('theme-dark', darkMode)
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [darkMode])

  // Listen for system theme changes if no local storage preference exists
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const saved = localStorage.getItem('theme-dark')
      // If we want to stay in default light mode, we might not want to auto-switch, 
      // but keeping this respects the user's OS changes if they haven't explicitly set a preference.
      // However, to ensure default is light, we can comment this out or leave it. 
      // I'll leave it but only apply if they really want OS syncing.
      if (saved === null) {
        // setDarkMode(e.matches) 
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
