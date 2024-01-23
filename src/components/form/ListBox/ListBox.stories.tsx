import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Item, useListData } from 'react-stately';
import { ListBox, ListBoxAria } from './ListBox.tsx';

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const listBoxOptions = [
  {
    key: 'id_people',
    label: 'People',
    children: [
      { key: 'id_david', label: 'David' },
      { key: 'id_sam', label: 'Sam' },
      { key: 'id_jane', label: 'Jane' },
    ],
  },
  {
    key: 'id_animals',
    label: 'Animals',
    children: [
      { key: 'id_cat', label: 'Cat' },
      { key: 'id_dog', label: 'Dog' },
      { key: 'id_snake', label: 'Snake' },
    ],
  },
];

export const Uncontrolled: Story = {
  args: {
    label: 'People and Animals',
    options: listBoxOptions,
    selectionMode: 'multiple',
    initialSelectedKeys: ['id_david', 'id_dog'],
    disabledKeys: ['id_sam', 'id_snake'],
  },
};

export const Controlled: Story = {
  render: function ControlledListBox() {
    const [selectedKeys, setSelectedKeys] = React.useState<Iterable<string>>([
      'id_david',
      'id_dog',
    ]);

    return (
      <>
        <ListBox
          label="People and Animals"
          options={listBoxOptions}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          disabledKeys={['id_sam', 'id_snake']}
        />
        <div className="mx-3 mt-1 text-xs">Selected keys: {[...selectedKeys].join(', ')}</div>
      </>
    );
  },
};

export const Custom: Story = {
  render: function CustomListBox() {
    const list = useListData({
      initialItems: [
        { key: '1', label: 'Sunny', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }, // prettier-ignore
        { key: '2', label: 'Cloudy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><polyline points="13 14 11 18 14 18 12 22" /></svg> }, // prettier-ignore
        { key: '3', label: 'Rainy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg> }, // prettier-ignore
        { key: '4', label: 'Snowy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(60 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(120 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(180 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(240 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(300 12 12)" /></svg> }, // prettier-ignore
      ],
      initialSelectedKeys: ['1'],
      getKey: (item) => item.key,
    });

    return (
      <ListBoxAria
        label="Weather"
        items={list.items}
        selectionMode="single"
        selectedKeys={list.selectedKeys}
        onSelectionChange={(keys) => list.setSelectedKeys(keys)}
      >
        {(node) => (
          <Item key={node.key}>
            <div className="absolute h-5 w-5">{node.icon}</div>
            <span className="ml-7">{node.label}</span>
          </Item>
        )}
      </ListBoxAria>
    );
  },
};
