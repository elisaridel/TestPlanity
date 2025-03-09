import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { initializeTheme, toggleDarkMode } from './themeHandler'

beforeAll(() => {
  globalThis.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  }

  globalThis.document.documentElement.style.colorScheme = ''
})

describe('toggleDarkMode', () => {
  it('should set theme to dark when current theme is light', () => {
    vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValue('dark')

    toggleDarkMode()

    expect(document.documentElement.style.colorScheme).toBe('light')

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('should set theme to light when current theme is dark', () => {
    vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValue('light')

    toggleDarkMode()

    expect(document.documentElement.style.colorScheme).toBe('dark')

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })
})

describe('initializeTheme', () => {
  beforeEach(() => {
    globalThis.localStorage.clear()
    document.documentElement.style.colorScheme = ''
  })

  it('should apply theme stored in local storage if theme is stored', () => {
    vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValue('dark')

    initializeTheme()

    expect(document.documentElement.style.colorScheme).toBe('dark')

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should not apply theme if no theme is stored in local storage', () => {
    vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValue('')

    initializeTheme()

    expect(document.documentElement.style.colorScheme).toBe('')
  })
})
