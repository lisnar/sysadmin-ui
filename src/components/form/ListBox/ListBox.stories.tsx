import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Item, Section, useListData, useTreeData } from 'react-stately';
import { ListBox } from './ListBox.tsx';

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Entity {
  id: number;
  name: string;
  icon?: React.ReactNode;
  children?: Entity[];
}

export const WithIcons: Story = {
  render: function ControlledListBox() {
    const list = useListData<Entity>({
      initialItems: [
        { id: 1, name: 'Sunny', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }, // prettier-ignore
        { id: 2, name: 'Cloudy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><polyline points="13 14 11 18 14 18 12 22" /></svg> }, // prettier-ignore
        { id: 3, name: 'Rainy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg> }, // prettier-ignore
        { id: 4, name: 'Snowy (Disabled)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(60 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(120 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(180 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(240 12 12)" /><path d="M10 4l2 1l2 -1m-2 -2v6.5l3 1.72" transform="rotate(300 12 12)" /></svg> }, // prettier-ignore
      ],
      initialSelectedKeys: ['3'],
      getKey: (item) => item.id,
    });

    return (
      <ListBox
        label="Weather"
        items={list.items}
        selectionMode="single"
        selectedKeys={list.selectedKeys}
        disabledKeys={['4']}
        onSelectionChange={(keys) => list.setSelectedKeys(keys)}
      >
        {(item) => (
          <Item key={item.id}>
            <div className="absolute h-5 w-5">{item.icon}</div>
            <span className="ml-7">{item.name}</span>
          </Item>
        )}
      </ListBox>
    );
  },
};

export const WithTreeData: Story = {
  render: function ControlledListBox() {
    const tree = useTreeData<Entity>({
      initialItems: [
        {
          id: 1,
          name: 'People',
          children: [
            { id: 11, name: 'David' },
            { id: 12, name: 'Sam' },
            { id: 13, name: 'Jane (Disabled)' },
          ],
        },
        {
          id: 2,
          name: 'Animals',
          children: [
            { id: 21, name: 'Aardvark (Disabled)' },
            { id: 22, name: 'Kangaroo' },
            { id: 23, name: 'Snake' },
          ],
        },
      ],
      initialSelectedKeys: ['12', '22'],
      getKey: (item) => item.id,
      getChildren: (item) => item.children ?? [],
    });

    return (
      <ListBox
        label="People and Animals"
        items={tree.items}
        selectionMode="multiple"
        selectedKeys={tree.selectedKeys}
        disabledKeys={['13', '21']}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: possible type mistake by react-stately
        onSelectionChange={(keys) => tree.setSelectedKeys(keys)}
      >
        {(node) => (
          <Section key={node.key} title={node.value.name} items={node.children}>
            {(node) => <Item key={node.key}>{node.value.name}</Item>}
          </Section>
        )}
      </ListBox>
    );
  },
};
