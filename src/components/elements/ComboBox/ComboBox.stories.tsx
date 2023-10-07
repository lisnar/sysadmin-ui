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

export const Overflow: Story = {
  render: () => (
    <ComboBox label="State">
      <Item>Alabama</Item>
      <Item>Alaska</Item>
      <Item>American Samoa</Item>
      <Item>Arizona</Item>
      <Item>Arkansas</Item>
      <Item>California</Item>
      <Item>Colorado</Item>
      <Item>Connecticut</Item>
      <Item>Delaware</Item>
      <Item>District of Columbia</Item>
      <Item>Florida</Item>
      <Item>Georgia</Item>
      <Item>Guam</Item>
      <Item>Hawaii</Item>
      <Item>Idaho</Item>
      <Item>Illinois</Item>
      <Item>Indiana</Item>
      <Item>Iowa</Item>
      <Item>Kansas</Item>
      <Item>Kentucky</Item>
      <Item>Louisiana</Item>
      <Item>Maine</Item>
      <Item>Maryland</Item>
      <Item>Massachusetts</Item>
      <Item>Michigan</Item>
      <Item>Minnesota</Item>
      <Item>Mississippi</Item>
      <Item>Missouri</Item>
      <Item>Montana</Item>
      <Item>Nebraska</Item>
      <Item>Nevada</Item>
      <Item>New Hampshire</Item>
      <Item>New Jersey</Item>
      <Item>New Mexico</Item>
      <Item>New York</Item>
      <Item>North Carolina</Item>
      <Item>North Dakota</Item>
      <Item>Northern Marianas Islands</Item>
      <Item>Ohio</Item>
      <Item>Oklahoma</Item>
      <Item>Oregon</Item>
      <Item>Pennsylvania</Item>
      <Item>Puerto Rico</Item>
      <Item>Rhode Island</Item>
      <Item>South Carolina</Item>
      <Item>South Dakota</Item>
      <Item>Tennessee</Item>
      <Item>Texas</Item>
      <Item>Utah</Item>
      <Item>Vermont</Item>
      <Item>Virginia</Item>
      <Item>Virgin Islands</Item>
      <Item>Washington</Item>
      <Item>West Virginia</Item>
      <Item>Wisconsin</Item>
      <Item>Wyoming</Item>
    </ComboBox>
  ),
};
