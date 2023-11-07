import { Meta, StoryObj } from '@storybook/react';
import { NumberField } from './NumberField.tsx';

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  tags: ['autodocs'],
  args: {
    label: 'Number',
    placeholder: '0',
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
