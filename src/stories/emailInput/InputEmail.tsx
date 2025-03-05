import { cn } from '../../utils'
import './index.scss'
import {
	EmailFieldProps,
	EmailHintProps,
	EmailInputComponent,
	EmailLabelProps,
} from './types'

import IconMail from '../../assets/icons/icon-mail.svg?react'

export const EmailInput: EmailInputComponent = ({
	children,
	error = false,
	disabled = false,
	success = false,
	dataTestId,
	size = 'default',
}) => {
	return (
		<div
			className={cn(
				'input-email',
				{
					['input-email__has-error']: error,
					['input-email__is-disabled']: disabled,
					['input-email__is-successful']: success,
				},
				[`input-email__${size}`],
			)}
			data-testid={dataTestId}
		>
			{children}
		</div>
	)
}

EmailInput.Field = (props: EmailFieldProps) => {
	return (
		<div className="input-email__field-container">
			<IconMail className="input-email__icon" />
			<input className="input-email__field" type="email" {...props} />
		</div>
	)
}

EmailInput.Label = ({ htmlFor, label, required }: EmailLabelProps) => {
	return (
		<label
			className="input-email__label"
			htmlFor={htmlFor}
			aria-required={required}
		>
			{label}{' '}
			{required && <span className="input-email__label-required">*</span>}
		</label>
	)
}

EmailInput.Hint = ({ hintText }: EmailHintProps) => {
	return <p className="input-email__hint">{hintText}</p>
}
