import { CheckIcon } from '../../icons';
import { HeadlessListBox, HeadlessListBoxProps } from './HeadlessListBox.tsx';
import { Option, OptionProps, Text } from './ListBoxBase.tsx';
import {
  listBoxOptionContainerStyle,
  listBoxOptionDescriptionStyle,
  listBoxOptionItemStyle,
  listBoxULStyle,
} from './style.ts';
// TODO: listBoxLabelStyle, listBoxSectionHeadingStyle, listBoxSectionSeparatorStyle

interface OptionExampleProps extends Omit<OptionProps, 'children'> {
  label: string;
  description: string;
}

export function ListBoxExample(props: HeadlessListBoxProps) {
  return (
    <div className="w-60">
      <HeadlessListBox {...props} className={listBoxULStyle} />
    </div>
  );
}

export function OptionExample(props: OptionExampleProps) {
  return (
    <Option {...props} className={listBoxOptionContainerStyle}>
      <Text slot="label" className={listBoxOptionItemStyle}>
        {props.label}
      </Text>
      <Text slot="description" className={listBoxOptionDescriptionStyle}>
        {props.description}
      </Text>
      <CheckIcon
        size="sm"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 group-data-[selected]:block"
        aria-hidden="true"
      />
    </Option>
  );
}
