import { useEffect, useState } from 'react'
import { EmailInput } from './components/emailInput/InputEmail'
import './scss/style.scss'
import {
  initializeTheme,
  toggleDarkMode,
} from './libs/themeHandler/themeHandler'

function App() {
  const [value, setValue] = useState('')

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="page-wrapper">
      <button onClick={() => toggleDarkMode()}>Toggle darkmode</button>
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
    </div>
  )
}

export default App
