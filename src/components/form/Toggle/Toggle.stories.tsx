import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle.tsx';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  // tags: ['autodocs'],
  args: {
    isDisabled: false,
    children: 'Toggle',
  },
  parameters: {
    controls: { exclude: ['className', 'defaultValue'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
