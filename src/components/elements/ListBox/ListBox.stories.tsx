import { Meta, StoryObj } from '@storybook/react';
import { useListData, useTreeData } from 'react-stately';
import { ListBox } from './ListBox.tsx';
import { Item, Section, Text } from './ListBoxBase.tsx';

const meta: Meta<typeof ListBox> = {
  title: 'Components/Elements/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Entity {
  id: number;
  name: string;
  children?: Entity[];
}

function ControlledListBox() {
  const list = useListData<Entity>({
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
      {(entity) => (
        <Item>
          <Text slot="label">{entity.name}</Text>
        </Item>
      )}
    </ListBox>
  );
}

export const ControlledList: Story = {
  render: ControlledListBox,
};

// TODO: `Item` if no children, `Section` if have children. Or add "Uncategorized" section.
function ControlledListBoxWithTreeData() {
  const tree = useTreeData<Entity>({
    initialItems: [
      {
        id: 1,
        name: 'People',
        children: [
          { id: 11, name: 'David' },
          { id: 12, name: 'Sam' },
          { id: 13, name: 'Jane' },
        ],
      },
      {
        id: 2,
        name: 'Animals',
        children: [
          { id: 21, name: 'Aardvark' },
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
      label="People and Animals" // if label is not provided, `aria-label` must be used
      items={tree.items}
      selectionMode="multiple"
      selectedKeys={tree.selectedKeys}
      disabledKeys={[4]}
      onSelectionChange={(keys) => keys !== 'all' && tree.setSelectedKeys(keys)}
    >
      {(node) => (
        <Section key={node.key} title={node.value.name} items={node.children}>
          {(node) => (
            <Item key={node.key}>
              <Text slot="label">{node.value.name}</Text>
            </Item>
          )}
        </Section>
      )}
    </ListBox>
  );
}

export const ControlledTree: Story = {
  render: ControlledListBoxWithTreeData,
};
