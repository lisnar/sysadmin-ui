import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button.tsx';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    className: undefined,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'rounded-full border-2 border-current px-4',
  },
};
