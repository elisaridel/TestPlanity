import type { Meta, StoryObj } from '@storybook/react'
import { EmailInput } from './InputEmail'
import { EmailInputStoryProps } from './types'
import { useState } from 'react'

const meta: Meta<typeof EmailInput> = {
	component: EmailInput,
	argTypes: {
		size: {
			control: 'select',
			options: ['default', 'big'],
		},
	},
}

export default meta

type Story = StoryObj<EmailInputStoryProps>

const EmailInputWrapper = (args: EmailInputStoryProps) => {
	const [email, setEmail] = useState('')

	return (
		<div className="medium-wrapper">
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
					required={args.required}
				/>
				<EmailInput.Field
					id={args.htmlFor}
					placeholder={args.placeholder}
					value={email}
					onChange={setEmail}
					required={args.required}
					disabled={args.disabled}
					informationCallback={args?.informationCallback}
				/>
				<EmailInput.Hint hintText={args.hintText} />
			</EmailInput>
		</div>
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
		required: true,
		informationCallback: () => alert('information'),
	},
	render: (args) => <EmailInputWrapper {...args} />,
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
		informationCallback: () => alert('information'),
	},
	render: (args) => <EmailInputWrapper {...args} />,
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
		informationCallback: () => alert('information'),
	},
	render: (args) => <EmailInputWrapper {...args} />,
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
		informationCallback: () => alert('information'),
	},
	render: (args) => <EmailInputWrapper {...args} />,
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
		informationCallback: () => alert('information'),
	},
	render: (args) => <EmailInputWrapper {...args} />,
}
