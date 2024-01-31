import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListBox, Option } from './ListBox.tsx';

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcons: Story = {
  args: {
    label: 'Weather',
    // prettier-ignore
    options: [{ key: '0', label: '', children: [
        { key: '1', label: 'Sunny', description: 'too hot', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
        { key: '2', label: 'Cloudy', description: 'nice', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><polyline points="13 14 11 18 14 18 12 22" /></svg> },
        { key: '3', label: 'Rainy', description: 'cold', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg> },
        { key: '4', label: 'Snowy', description: 'too cold', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(60 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(120 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(180 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(240 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(300 12 12)" /></svg> },
    ]}],
    selectionMode: 'single',
    defaultSelectedKeys: '1',
    onSelectionChange: undefined,
  },
};

export const ControlledMultiple: Story = {
  render: function ControlledListBox() {
    const [selectedKeys, setSelectedKeys] = React.useState<Iterable<string>>(['id_sam', 'id_dog']);
    // prettier-ignore
    const options: Option[] = [
      { key: 'id_people', label: 'People', children: [
          { key: 'id_david', label: 'David' },
          { key: 'id_sam', label: 'Sam' },
          { key: 'id_jane', label: 'Jane' },
      ]},
      { key: 'id_animals', label: 'Animals', children: [
          { key: 'id_cat', label: 'Cat' },
          { key: 'id_dog', label: 'Dog' },
          { key: 'id_snake', label: 'Snake' },
      ]},
    ];

    return (
      <>
        <ListBox
          label="People and Animals"
          options={options}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        />
        <div className="mx-3 mt-1 text-xs">Selected keys: {[...selectedKeys].join(', ')}</div>
      </>
    );
  },
};
