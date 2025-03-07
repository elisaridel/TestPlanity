import type { Meta, StoryObj } from '@storybook/react'
import { EmailInput } from './InputEmail'
import { EmailInputStoryProps } from './types'
import { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'

const meta: Meta<typeof EmailInput> = {
	component: EmailInput,
}

export default meta

type Story = StoryObj<EmailInputStoryProps>

const EmailInputWrapper = (args: EmailInputStoryProps) => {
	const [email, setEmail] = useState('')

	return (
		<EmailInput
			error={args.error}
			disabled={args.disabled}
			success={args.success}
			size={args.size ?? 'default'}
			dataTestId="input-email"
		>
			<EmailInput.Label
				htmlFor={args.htmlFor}
				label={args.label}
				required={!!args.required}
			/>
			<EmailInput.Field
				id={args.htmlFor}
				placeholder={args.placeholder}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required={args.required}
				disabled={!!args.disabled}
			/>
			<EmailInput.Hint hintText={args.hintText} />
		</EmailInput>
	)
}

export const Default: Story = {
	args: {
		htmlFor: 'email',
		label: 'Email',
		placeholder: 'mail@planity.com',
		hintText: 'This is a hint text to help user.',
		error: false,
		disabled: false,
		success: false,
		required: true,
	},
	render: (args) => <EmailInputWrapper {...args} />,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement)

		if (args.hintText) {
			const hint = canvas.getByText(args.hintText)
			await expect(hint).toBeInTheDocument()
		}

		const input = canvas.getByPlaceholderText(args.placeholder)
		await userEvent.type(input, 'test@email.com')
		await expect(input).toHaveValue('test@email.com')

		const label = canvas.getByText(args.label)
		await expect(label).toBeInTheDocument()

		if (args.required) {
			await expect(label).toHaveAttribute('aria-required', 'true')

			const requiredAsterisk = canvas.getByText('*')
			await expect(requiredAsterisk).toBeInTheDocument()

			await expect(label).toHaveAttribute('aria-required', 'true')
			await expect(input).toHaveAttribute('required', '')
		}
	},
}

export const Success: Story = {
	args: {
		htmlFor: 'email',
		label: 'Email',
		placeholder: 'mail@planity.com',
		hintText: 'This is a hint text to help user.',
		error: false,
		disabled: false,
		success: true,
		required: true,
	},
	render: (args) => <EmailInputWrapper {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const emailInputContainer = canvas.getByTestId('input-email')
		await expect(emailInputContainer).toHaveClass(
			'input-email__is-successful',
		)
	},
}

export const Disabled: Story = {
	args: {
		htmlFor: 'email',
		label: 'Email',
		placeholder: 'mail@planity.com',
		hintText: 'This is a hint text to help user.',
		error: false,
		disabled: true,
		success: false,
		required: true,
	},
	render: (args) => <EmailInputWrapper {...args} />,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement)
		const emailInputContainer = canvas.getByTestId('input-email')
		await expect(emailInputContainer).toHaveClass(
			'input-email__is-disabled',
		)

		const input = canvas.getByPlaceholderText(args.placeholder)
		await expect(input).toBeDisabled()
		await userEvent.type(input, 'test@email.com')
		await expect(input).toHaveValue('')
	},
}

export const Error: Story = {
	args: {
		htmlFor: 'email',
		label: 'Email',
		placeholder: 'mail@planity.com',
		hintText: 'This is a hint text to help user.',
		error: true,
		disabled: false,
		success: false,
		required: true,
	},
	render: (args) => <EmailInputWrapper {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const emailInputContainer = canvas.getByTestId('input-email')
		await expect(emailInputContainer).toHaveClass('input-email__has-error')
	},
}

export const Big: Story = {
	args: {
		htmlFor: 'email',
		label: 'Email',
		placeholder: 'mail@planity.com',
		hintText: 'This is a hint text to help user.',
		error: false,
		disabled: false,
		success: false,
		required: true,
		size: 'big',
	},
	render: (args) => <EmailInputWrapper {...args} />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const emailInputContainer = canvas.getByTestId('input-email')
		await expect(emailInputContainer).toHaveClass('input-email__big')
	},
}
