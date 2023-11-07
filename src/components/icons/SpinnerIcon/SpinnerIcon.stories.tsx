import { Meta, StoryObj } from '@storybook/react';
import { SpinnerIcon } from './SpinnerIcon.tsx';

const meta: Meta<typeof SpinnerIcon> = {
  component: SpinnerIcon,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    size: 'md',
  },
};
