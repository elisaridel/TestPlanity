import '../src/scss/style.scss'

import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.style.setProperty(
        'color-scheme',
        context.globals.scheme,
      )
      return Story()
    },
  ],
}

export const globalTypes = {
  scheme: {
    name: 'Scheme',
    description: 'Select light or dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark'],
      showName: true,
      dynamicTitle: true,
    },
  },
}

export default preview
