import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../elements/Button';
import { ComboBox } from './ComboBox.tsx';

const meta: Meta<typeof ComboBox> = {
  component: ComboBox,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'e.g. lorem.ipsum@dolor.sit',
    description: '',
    errorMessage: '',
    isDisabled: false,
  },
  parameters: {
    controls: { exclude: ['children', 'className', 'defaultValue'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const animals = ['Lion', 'Elephant', 'Tiger'];
const people = ['Alice', 'David', 'Emma'];
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']; // prettier-ignore

export const Uncontrolled: Story = {
  args: {
    label: 'State',
    options: [{ key: 'section_01', children: states.map((v, i) => ({ key: String(i), label: v })) }], // prettier-ignore
    defaultSelectedKey: '1',
    placeholder: 'e.g. Alabama, Alaska, etc.',
    description: 'This is an optional helper text',
    errorMessage: '',
    isDisabled: false,
  },
};

export const Controlled: Story = {
  render: function ControlledComboBox() {
    const [selectedKey, setSelectedKey] = React.useState('0');

    return (
      <>
        <ComboBox
          label="People and Animals"
          options={[
            { key: 'section_01', label: 'People', children: people.map((v, i) => ({ key: String(i), label: v })) }, // prettier-ignore
            { key: 'section_02', label: 'Animals', children: animals.map((v, i) => ({ key: String(people.length + i), label: v })) }, // prettier-ignore
          ]}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
        <div className="mx-3 mt-1.5 flex items-center text-xs">
          <div className="mr-2">Selected key: {selectedKey}</div>
          <Button className="h-5" onPress={() => setSelectedKey('0')}>
            Reset
          </Button>
        </div>
      </>
    );
  },
};
