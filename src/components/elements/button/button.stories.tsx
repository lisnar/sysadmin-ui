import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button.tsx';
import { buttonClassVariant } from './style.ts';

const meta: Meta<typeof Button> = {
  title: 'Components/Elements/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
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
    className: buttonClassVariant({ color: 'primary' }),
  },
};

export const Secondary: Story = {
  args: {
    className: buttonClassVariant({ color: 'secondary' }),
  },
};

export const Plain: Story = {
  args: {
    className: buttonClassVariant({ color: 'plain' }),
  },
};

export const Danger: Story = {
  args: {
    className: buttonClassVariant({ color: 'danger' }),
  },
};
