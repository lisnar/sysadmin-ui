import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField.tsx';

const meta: Meta<typeof TextField> = {
  title: 'Components/Elements/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'e.g. lorem.ipsum@dolor.sit',
    description: '',
    errorMessage: '',
    isDisabled: false,
  },
  parameters: {
    controls: { exclude: ['className', 'defaultValue'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHelperText: Story = {
  args: {
    description: 'This is an optional helper text',
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: 'This is an error message',
  },
};
