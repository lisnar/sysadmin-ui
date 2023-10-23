import { Meta, StoryObj } from '@storybook/react';
import { Item, Section, useListData, useTreeData } from 'react-stately';
import { ListBoxExample, OptionExample } from './ListBoxExample.tsx';
import { ListBoxOld } from './ListBoxOld.tsx';

const meta: Meta<typeof ListBoxOld> = {
  title: 'Components/Elements/ListBox',
  component: ListBoxOld,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithContext: Story = {
  render: () => (
    <ListBoxExample label="Number" selectionMode="single">
      {/*<Section title="Section 1">*/}
      <OptionExample key="1" label="One" description="lorem ipsum dolor sit amet" />
      <OptionExample key="2" label="Two" description="consectetur adipiscing elit" />
      <OptionExample key="3" label="Three" description="sed faucibus massa lorem" />
      {/*</Section>*/}
      {/*<Section title="Section 2">*/}
      <OptionExample key="4" label="Four" description="nam elementum nibh velit" />
      <OptionExample key="5" label="Five" description="etiam turpis ipsum" />
      <OptionExample key="6" label="Six" description="facilisis sit amet accumsan auctor" />
      {/*</Section>*/}
      {/*<Section title="Section 3">*/}
      <OptionExample key="7" label="Seven" description="varius in lectus" />
      <OptionExample key="8" label="Eight" description="in tristique" />
      <OptionExample key="9" label="Nine" description="tortor et convallis vestibulum" />
      {/*</Section>*/}
    </ListBoxExample>
  ),
};

export const Single: Story = {
  render: () => (
    <ListBoxOld label="Number" selectionMode="single">
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
    </ListBoxOld>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ListBoxOld label="Number" selectionMode="multiple">
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
    </ListBoxOld>
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
    <ListBoxOld
      label="Animals" // if label is not provided, `aria-label` must be used
      items={list.items}
      selectionMode="single"
      selectedKeys={list.selectedKeys}
      disabledKeys={[4]}
      // Using arrow function to suppress `@typescript-eslint/unbound-method` error.
      onSelectionChange={(keys) => list.setSelectedKeys(keys)}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBoxOld>
  );
}

export const ControlledList: Story = {
  render: ControlledListBox,
};

// TODO: `Item` if no children, `Section` if have children. Or add "Uncategorized" section.
function ControlledListBoxWithTreeData() {
  const tree = useTreeData<Item>({
    initialItems: [
      {
        id: 1,
        name: 'People',
        items: [
          { id: 11, name: 'David' },
          { id: 12, name: 'Sam' },
          { id: 13, name: 'Jane' },
        ],
      },
      {
        id: 2,
        name: 'Animals',
        items: [
          { id: 21, name: 'Aardvark' },
          { id: 22, name: 'Kangaroo' },
          { id: 23, name: 'Snake' },
        ],
      },
    ],
    initialSelectedKeys: ['12', '22'],
    getKey: (item) => item.id,
    getChildren: (item) => item.items ?? [],
  });

  return (
    <ListBoxOld
      label="People and Animals" // if label is not provided, `aria-label` must be used
      items={tree.items}
      selectionMode="multiple"
      selectedKeys={tree.selectedKeys}
      disabledKeys={[4]}
      onSelectionChange={(keys) => keys !== 'all' && tree.setSelectedKeys(keys)}
    >
      {(node) => (
        <Section key={node.key} title={node.value.name} items={node.children}>
          {(node) => <Item key={node.key}>{node.value.name}</Item>}
        </Section>
      )}
    </ListBoxOld>
  );
}

export const ControlledTree: Story = {
  render: ControlledListBoxWithTreeData,
};
