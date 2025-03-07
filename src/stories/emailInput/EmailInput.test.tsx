import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import { EmailInput } from './InputEmail'
import { useState } from 'react'
import '@testing-library/jest-dom'
import { EmailInputStoryProps } from './types'

type TestComponentProps = Pick<EmailInputStoryProps, 'required'>

const TestComponent = ({ required }: TestComponentProps) => {
	const [email, setEmail] = useState('')
	const [isValid, setIsValid] = useState(true)

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		setIsValid(emailRegex.test(email))
	}

	return (
		<EmailInput error={!isValid} dataTestId="email-input-container">
			<EmailInput.Label
				htmlFor="email"
				label="Email"
				required={required}
			/>
			<EmailInput.Field
				id="email"
				placeholder="mail@planity.com"
				value={email}
				onChange={(e) => {
					validateEmail(e.target.value)
					setEmail(e.target.value)
				}}
				required={required}
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
	expect(emailInputContainer).toHaveClass('input-email__has-error')
})

test('should not show error when email is valid', async () => {
	render(<TestComponent />)

	const input = screen.getByPlaceholderText('mail@planity.com')

	await userEvent.type(input, 'valid@email.com')

	const emailInputContainer = screen.getByTestId('email-input-container')

	expect(emailInputContainer).not.toHaveClass('input-email__has-error')
})

test('should prevent form submission if email is empty', async () => {
	render(
		<form onSubmit={(e) => e.preventDefault()}>
			<TestComponent required />
			<button type="submit">Submit</button>
		</form>,
	)

	const input = screen.getByPlaceholderText('mail@planity.com')
	const submitButton = screen.getByText('Submit')

	await userEvent.click(submitButton)

	expect(input).toBeInvalid()
})
