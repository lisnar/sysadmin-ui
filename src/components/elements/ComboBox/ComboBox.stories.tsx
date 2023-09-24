import { Meta, StoryObj } from '@storybook/react';
import { Item } from 'react-stately';
import { ComboBox } from './ComboBox.tsx';

const meta: Meta<typeof ComboBox> = {
  title: 'Components/Elements/ComboBox',
  component: ComboBox,
  // tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => (
    <ComboBox label="Favorite Animal">
      <Item key="red panda">Red Panda</Item>
      <Item key="cat">Cat</Item>
      <Item key="dog">Dog</Item>
      <Item key="aardvark">Aardvark</Item>
      <Item key="kangaroo">Kangaroo</Item>
      <Item key="snake">Snake</Item>
    </ComboBox>
  ),
};
