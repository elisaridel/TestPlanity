import { describe, expect, it } from 'vitest'
import { validateEmail } from './validateEmail'

describe('validateEmail', () => {
	it('should return true for valid email', () => {
		const email = 'test@example.com'
		expect(validateEmail(email)).toBe(true)
	})

	it('should return false for email without @', () => {
		const email = 'testexample.com'
		expect(validateEmail(email)).toBe(false)
	})

	it('should return false for email without domain', () => {
		const email = 'test@.com'
		expect(validateEmail(email)).toBe(false)
	})

	it('should return false for email with invalid caracters', () => {
		const email = 'test@exam!ple.com'
		expect(validateEmail(email)).toBe(false)
	})
})
