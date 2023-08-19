import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner.tsx';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    className: 'h-10 w-10',
  },
};
