import { useRef } from 'react';
import { AriaListBoxProps, useListBox, useListBoxSection, useOption } from 'react-aria';
import { ListState, Node, useListState } from 'react-stately';
import { CheckIcon } from '../../icons';
import {
  listBoxLabelStyle,
  listBoxOptionContainerStyle,
  listBoxOptionDescriptionStyle,
  listBoxOptionItemStyle,
  listBoxSectionHeadingStyle,
  listBoxSectionSeparatorStyle,
  listBoxULStyle,
} from './style.ts';

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  const ref = useRef(null);

  const { listBoxProps, labelProps } = useListBox(
    {
      ...props,
      shouldFocusOnHover: true,
      shouldFocusWrap: true,
    },
    state,
    ref,
  );

  return (
    <div className="w-60">
      <div {...labelProps} className={listBoxLabelStyle}>
        {props.label}
      </div>
      <ul {...listBoxProps} ref={ref} className={listBoxULStyle}>
        {[...state.collection].map((item) => {
          const ListBoxItem = item.type === 'section' ? ListBoxSection : ListBoxOption;
          return <ListBoxItem key={item.key} item={item} state={state} />;
        })}
      </ul>
    </div>
  );
}

interface ListBoxItemProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

function ListBoxOption<T extends object>({ item, state }: ListBoxItemProps<T>) {
  const ref = useRef(null);

  const { optionProps, descriptionProps, isSelected, isDisabled } = useOption(
    {
      'key': item.key,
      'aria-label': item['aria-label'],
    },
    state,
    ref,
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={listBoxOptionContainerStyle}
      data-selected={isSelected || undefined}
      data-disabled={isDisabled || undefined}
    >
      <span className={listBoxOptionItemStyle}>{item.rendered}</span>
      {/* TODO: use context to get descriptionProps and pass component from `item.rendered` */}
      <span {...descriptionProps} className={listBoxOptionDescriptionStyle}>
        @{item.type}
      </span>
      {/* TODO: create `SelectedMark` component, pass icon and className as props. Add data-focused and data-focus-visible. */}
      {isSelected && (
        <CheckIcon
          size="sm"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
      )}
    </li>
  );
}

function ListBoxSection<T extends object>({ item, state }: ListBoxItemProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': item.rendered,
    'aria-label': item['aria-label'],
  });

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {/* TODO: this can be separated from Section as optional SectionSeparator component */}
      {item.key !== state.collection.getFirstKey() && (
        <li role="presentation" className={listBoxSectionSeparatorStyle} />
      )}
      <li {...itemProps}>
        {item.rendered && (
          <div className={listBoxSectionHeadingStyle}>
            <span {...headingProps}>{item.rendered}</span>
          </div>
        )}
        <ul {...groupProps}>
          {[...state.collection.getChildren!(item.key)].map((node) => (
            <ListBoxOption key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
