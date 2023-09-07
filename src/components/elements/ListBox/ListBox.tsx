import { useRef } from 'react';
import {
  AriaListBoxProps,
  mergeProps,
  useFocusRing,
  useListBox,
  useListBoxSection,
  useOption,
} from 'react-aria';
import { ListState, Node, useListState } from 'react-stately';

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);

  const ref = useRef(null);
  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul
        {...listBoxProps}
        ref={ref}
        style={{
          padding: 0,
          margin: '5px 0',
          listStyle: 'none',
          border: '1px solid gray',
          maxWidth: 250,
          maxHeight: 300,
          overflow: 'auto',
        }}
      >
        {[...state.collection].map((item) =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <ListBoxOption key={item.key} item={item} state={state} />
          ),
        )}
      </ul>
    </>
  );
}

interface ListBoxOptionProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

function ListBoxOption<T extends object>({ item, state }: ListBoxOptionProps<T>) {
  // Get props for the option element
  const ref = useRef(null);
  const { optionProps, isSelected, isDisabled } = useOption({ key: item.key }, state, ref);

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        background: isSelected ? 'blueviolet' : 'transparent',
        color: isDisabled ? '#aaa' : isSelected ? 'white' : undefined,
        padding: '2px 5px',
        outline: isFocusVisible ? '2px solid orange' : 'none',
      }}
    >
      {item.rendered}
    </li>
  );
}

interface ListBoxSectionProps<T> {
  section: Node<T>;
  state: ListState<T>;
}

function ListBoxSection<T extends object>({ section, state }: ListBoxSectionProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': section.rendered,
    'aria-label': section['aria-label'],
  });

  const childNodes = state.collection.getChildren?.(section.key) ?? [];

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          role="presentation"
          style={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px',
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none',
          }}
        >
          {[...childNodes].map((node) => (
            <ListBoxOption key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
