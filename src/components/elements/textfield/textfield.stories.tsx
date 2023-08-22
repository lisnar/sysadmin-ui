import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './textfield.tsx';

const meta: Meta<typeof TextField> = {
  title: 'Components/Elements/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'lorem.ipsum@dolor.sit',
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
    description: 'This is a helper text',
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: 'This is an error message',
  },
};
