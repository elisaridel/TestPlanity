import { useState } from 'react'
import { EmailInput } from './components/emailInput/InputEmail'
import './scss/style.scss'

function App() {
	const [value, setValue] = useState('')

	return (
		<div className="medium-wrapper">
			<EmailInput>
				<EmailInput.Label htmlFor="email" label="Email" required />
				<EmailInput.Field
					id="email"
					placeholder="mail@planity.com"
					value={value}
					onChange={setValue}
					required
					informationCallback={() => alert('information')}
				/>
				<EmailInput.Hint hintText="This is a hint text to help user." />
			</EmailInput>
		</div>
	)
}

export default App
