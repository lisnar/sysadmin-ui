import { Meta, StoryObj } from '@storybook/react';
import { Item, Section, useListData } from 'react-stately';
import { ListBox } from './ListBox.tsx';

const meta: Meta<typeof ListBox> = {
  title: 'Components/Elements/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ListBox label="Number" selectionMode="single">
      <Section title="Section 1">
        <Item key="1">One</Item>
        <Item key="2">Two</Item>
        <Item key="3">Three</Item>
      </Section>
      <Section title="Section 2">
        <Item key="4">Four</Item>
        <Item key="5">Five</Item>
        <Item key="6">Six</Item>
      </Section>
      <Section title="Section 3">
        <Item key="7">Seven</Item>
        <Item key="8">Eight</Item>
        <Item key="9">Nine</Item>
      </Section>
    </ListBox>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ListBox label="Number" selectionMode="multiple">
      <Section title="Section 1">
        <Item key="1">One</Item>
        <Item key="2">Two</Item>
        <Item key="3">Three</Item>
      </Section>
      <Section title="Section 2">
        <Item key="4">Four</Item>
        <Item key="5">Five</Item>
        <Item key="6">Six</Item>
      </Section>
      <Section title="Section 3">
        <Item key="7">Seven</Item>
        <Item key="8">Eight</Item>
        <Item key="9">Nine</Item>
      </Section>
    </ListBox>
  ),
};

interface Item {
  id: number;
  name: string;
  items?: Item[];
}

function ControlledListBox() {
  const list = useListData<Item>({
    initialItems: [
      { id: 1, name: 'Aardvark' },
      { id: 2, name: 'Kangaroo' },
      { id: 3, name: 'Snake' },
      { id: 4, name: 'Disabled Animal' },
    ],
    initialSelectedKeys: [3],
    getKey: (item) => item.id,
  });

  return (
    <ListBox
      label="Animals" // if label is not provided, `aria-label` must be used
      items={list.items}
      selectionMode="single"
      selectedKeys={list.selectedKeys}
      disabledKeys={[4]}
      // Using arrow function to suppress `@typescript-eslint/unbound-method` error.
      onSelectionChange={(keys) => list.setSelectedKeys(keys)}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  );
}

export const Controlled: Story = {
  render: ControlledListBox,
};
