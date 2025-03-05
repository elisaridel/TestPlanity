import type { Meta, StoryObj } from '@storybook/react'
import EmailInput from './InputEmail'

const meta: Meta<typeof EmailInput> = {
	component: EmailInput,
	args: {},
}

export default meta
type Story = StoryObj<typeof EmailInput>

export const Default: Story = {}
