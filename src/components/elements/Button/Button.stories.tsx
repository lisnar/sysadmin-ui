import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button.tsx';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    isDisabled: false,
    isLoading: false,
  },
  parameters: {
    controls: { exclude: ['className'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    intent: 'primary',
  },
};

export const Neutral: Story = {
  args: {
    intent: 'neutral',
  },
};

export const Destructive: Story = {
  args: {
    intent: 'destructive',
  },
};
