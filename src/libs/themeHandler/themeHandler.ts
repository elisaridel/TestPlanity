export const toggleDarkMode = () => {
  const currentTheme = localStorage.getItem('theme') || 'light'

  if (currentTheme === 'dark') {
    document.documentElement.style.colorScheme = 'light'
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.style.colorScheme = 'dark'
    localStorage.setItem('theme', 'dark')
  }
}

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    document.documentElement.style.colorScheme = savedTheme
  }
}
