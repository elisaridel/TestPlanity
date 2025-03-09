import { fireEvent, render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import { EmailInput } from './InputEmail'
import '@testing-library/jest-dom'
import { EmailInputStoryProps } from './types'

type EmailInputTestProps = Omit<EmailInputStoryProps, 'children'>

const renderComponent = ({
	required,
	htmlFor,
	label,
	id,
	placeholder,
	value,
	onChange,
	hintText,
	size,
	error,
	success,
	disabled,
	informationCallback,
}: EmailInputTestProps) => {
	return (
		<EmailInput
			dataTestId="email-input-container"
			size={size}
			error={error}
			success={success}
			disabled={disabled}
		>
			<EmailInput.Label
				htmlFor={htmlFor}
				label={label}
				required={required}
			/>
			<EmailInput.Field
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				informationCallback={informationCallback}
			/>
			<EmailInput.Hint hintText={hintText} />
		</EmailInput>
	)
}

const props = {
	htmlFor: 'email',
	label: 'Email',
	placeholder: 'mail@planity.com',
	hintText: 'This is a hint text to help user.',
	error: false,
	disabled: false,
	required: true,
	informationCallback: () => alert('information'),
	value: '',
	id: 'email',
	onChange: () => {},
	testId: 'email-input-container',
}

describe('EmailInput', () => {
	it('should update input value with what the user typed', async () => {
		const mockOnChange = vi.fn()

		render(renderComponent({ ...props, onChange: mockOnChange }))

		const inputElement = screen.getByPlaceholderText(
			props.placeholder,
		) as HTMLInputElement

		fireEvent.change(inputElement, {
			target: { value: 'test@example.com' },
		})

		expect(mockOnChange).toHaveBeenCalledTimes(1)
		expect(mockOnChange).toHaveBeenCalledWith('test@example.com')
	})

	it('should have is-successfull class when props success is true', async () => {
		render(renderComponent({ ...props, success: true }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).toHaveClass('input-email__is-successful')
	})

	it('should not have is-successfull class when props success is false', async () => {
		render(renderComponent({ ...props, success: false }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).not.toHaveClass(
			'input-email__is-successful',
		)
	})

	it('should have input-email__has-error class when props error is true', async () => {
		render(renderComponent({ ...props, error: true }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).toHaveClass('input-email__has-error')
	})

	it('should not have input-email__has-error class when props error is false', async () => {
		render(renderComponent({ ...props, error: false }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).not.toHaveClass('input-email__has-error')
	})

	it('should have input-email__is-disabled class when props disabled is true', async () => {
		render(renderComponent({ ...props, disabled: true }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).toHaveClass('input-email__is-disabled')
	})

	it('should not have input-email__is-disabled class when props disabled is false', async () => {
		render(renderComponent({ ...props, disabled: false }))

		const emailInputContainer = screen.getByTestId('email-input-container')

		expect(emailInputContainer).not.toHaveClass('input-email__is-disabled')
	})

	it('should display hintText when it is defined', async () => {
		render(renderComponent({ ...props, hintText: props.hintText }))

		const hintElement = screen.getByText(props.hintText)

		expect(hintElement).toBeInTheDocument()
	})

	it('should display an asterisk and have aria-required attribute when required is true', async () => {
		render(renderComponent({ ...props, required: true }))

		const asterisk = screen.getByText('*')
		expect(asterisk).toBeInTheDocument()
		const inputElement = screen.getByPlaceholderText(props.placeholder)
		expect(inputElement).toHaveAttribute('aria-required', 'true')
	})

	it('should not display an asterisk and aria-required attribute when required is false', async () => {
		render(renderComponent({ ...props, required: false }))

		const asterisk = screen.queryByText('*')
		expect(asterisk).not.toBeInTheDocument()
		const inputElement = screen.getByPlaceholderText(props.placeholder)
		expect(inputElement).not.toHaveAttribute('aria-required', 'true')
	})
})
