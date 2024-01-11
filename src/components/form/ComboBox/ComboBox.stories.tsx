import { Meta, StoryObj } from '@storybook/react';
import { useListData, useTreeData } from 'react-stately';
import { Item, Section, Text } from '../../elements/ListBox';
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

interface Entity {
  id: number;
  name: string;
  children?: Entity[];
}

const animals = ['Lion', 'Elephant', 'Tiger', 'Giraffe', 'Disabled Kangaroo', 'Zebra', 'Panda', 'Hippopotamus', 'Koala', 'Leopard', 'Rhinoceros', 'Cheetah', 'Penguin', 'Gorilla', 'Polar Bear', 'Ostrich', 'Puma', 'Camel', 'Dolphin', 'Octopus', 'Toucan', 'Lemur', 'Flamingo', 'Orangutan', 'Pangolin', 'Armadillo', 'Sloth', 'Peacock', 'Seahorse', 'Jaguar', 'Hedgehog', 'Kangaroo', 'Capybara', 'Otter', 'Platypus', 'Raccoon', 'Vulture'] // prettier-ignore
const people = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabel', 'Jack', 'Katherine', 'Liam', 'Mia', 'Nathan', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Samuel', 'Taylor', 'Ursula', 'Vincent', 'Wendy', 'Xander', 'Yvonne', 'Zachary', 'Sophia', 'Michael', 'Ava', 'James', 'Elizabeth', 'Daniel', 'Ella', 'William', 'Chloe', 'Ethan', 'Matthew', 'Emily', 'Benjamin', 'Oliver', 'Lily', 'Joseph', 'Abigail', 'John', 'Natalie', 'Noah', 'Avery']; // prettier-ignore
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']; // prettier-ignore

export const Uncontrolled: Story = {
  args: {
    label: 'State',
    placeholder: 'e.g. Alabama, Alaska, etc.',
    description: 'This is an optional helper text',
    errorMessage: '',
    isDisabled: false,
    children: states.map((item) => (
      <Item key={item} textValue={item}>
        <Text slot="label">{item}</Text>
      </Item>
    )),
  },
};

export const ControlledList: Story = {
  render: function ControlledComboBox() {
    const list = useListData<Entity>({
      initialItems: animals.map((v, i) => ({ id: i, name: v })),
      getKey: (item) => item.id,
    });

    return (
      <ComboBox
        label="Animals" // if label is not provided, `aria-label` must be used
        defaultItems={list.items}
        disabledKeys={['4']}
      >
        {(item) => (
          <Item key={item.id} textValue={item.name}>
            <Text slot="label">{item.name}</Text>
          </Item>
        )}
      </ComboBox>
    );
  },
};

export const ControlledTree: Story = {
  render: function ControlledComboBox() {
    const tree = useTreeData<Entity>({
      initialItems: [
        {
          id: 1,
          name: 'People',
          children: people.map((v, i) => ({ id: i + 1000, name: v })),
        },
        {
          id: 2,
          name: 'Animals',
          children: animals.map((v, i) => ({ id: i + 2000, name: v })),
        },
      ],
      getKey: (item) => item.id,
      getChildren: (item) => item.children ?? [],
    });

    return (
      <ComboBox label="People and Animals" defaultItems={tree.items}>
        {(node) => (
          <Section key={node.key} title={node.value.name} items={node.children}>
            {(node) => (
              <Item key={node.key} textValue={node.value.name}>
                <Text slot="label">{node.value.name}</Text>
              </Item>
            )}
          </Section>
        )}
      </ComboBox>
    );
  },
};
