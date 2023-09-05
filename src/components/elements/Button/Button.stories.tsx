import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button.tsx';

const meta: Meta<typeof Button> = {
  title: 'Components/Elements/Button',
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
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const Plain: Story = {
  args: {
    color: 'plain',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
  },
};
