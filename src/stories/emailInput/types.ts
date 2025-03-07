import { ReactNode } from 'react'

export type EmailInputStoryProps = EmailFieldProps &
	EmailLabelProps &
	EmailHintProps &
	EmailInputProps

type EmailInputProps = {
	children: ReactNode
	error?: boolean
	disabled?: boolean
	success?: boolean
	dataTestId?: string
	size?: 'default' | 'big'
}

export type EmailInputComponent = React.FC<EmailInputProps> & {
	Field: React.FC<EmailFieldProps>
	Label: React.FC<EmailLabelProps>
	Hint: React.FC<EmailHintProps>
}

export type EmailFieldProps = {
	id: string
	placeholder: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	required?: boolean
	disabled?: boolean
	informationCallback?: () => void
}

export type EmailLabelProps = {
	htmlFor: string
	label: string
	required?: boolean
}

export type EmailHintProps = {
	hintText: string
}
