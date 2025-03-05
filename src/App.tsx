import { useState } from 'react'
import './scss/style.scss'
import { setColorScheme } from './utils'

function App() {
	const [colorScheme, changeColorScheme] = useState('light')

	return (
		<div>
			<button
				onClick={() => {
					setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
					changeColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
				}}
			>
				changer le thème
			</button>
		</div>
	)
}

export default App
