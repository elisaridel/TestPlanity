import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import { EmailInput } from './InputEmail'
import { useState } from 'react'
import '@testing-library/jest-dom'

const TestComponent = () => {
	const [email, setEmail] = useState('')
	const [isValid, setIsValid] = useState(true)

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		setIsValid(emailRegex.test(email))
	}

	return (
		<EmailInput error={!isValid} dataTestId="email-input-container">
			<EmailInput.Label htmlFor="email" label="Email" />
			<EmailInput.Field
				id="email"
				placeholder="mail@planity.com"
				value={email}
				onChange={(e) => {
					validateEmail(e.target.value)
					setEmail(e.target.value)
				}}
			/>
			<EmailInput.Hint hintText="Entrez votre email" />
		</EmailInput>
	)
}

test('should update the value when typed into', async () => {
	render(<TestComponent />)

	const input = screen.getByPlaceholderText('mail@planity.com')
	await userEvent.type(input, 'test@example.com')

	expect(input).toHaveValue('test@example.com')
})

test('should validate email and show error when email is invalid', async () => {
	render(<TestComponent />)

	const input = screen.getByPlaceholderText('mail@planity.com')

	await userEvent.type(input, 'invalid-email')

	const emailInputContainer = screen.getByTestId('email-input-container')
	expect(emailInputContainer).toHaveClass('has-error')
})
