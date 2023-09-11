import { useRef } from 'react';
import {
  AriaListBoxProps,
  mergeProps,
  useHover,
  useListBox,
  useListBoxSection,
  useOption,
} from 'react-aria';
import { ListState, Node, useListState } from 'react-stately';
import { CheckIcon } from '../../icons/CheckIcon.tsx';
import { classNames } from '../utils.ts';

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  const ref = useRef(null);

  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <div className="w-60">
      <div {...labelProps} className="text-sm font-medium text-gray-700">
        {props.label}
      </div>
      <ul
        {...listBoxProps}
        ref={ref}
        className={classNames(
          'overflow-auto', // behavior
          'mt-1 w-full rounded-md bg-white py-1 text-sm shadow-lg', // appearance
          'ring-1 ring-black ring-opacity-5 focus:outline-none', // outline
        )}
      >
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

function ListBoxOption<T extends object>(props: ListBoxItemProps<T>) {
  const { item, state } = props;
  const ref = useRef(null);

  const { optionProps, descriptionProps, isSelected, isFocused, isFocusVisible, isDisabled } =
    useOption(item, state, ref);
  const { hoverProps, isHovered } = useHover({
    isDisabled: state.selectionManager.isDisabled(item.key),
    onHoverStart() {
      // Use this because `shouldFocusOnHover` in `useOption` is deprecated.
      if (!isFocusVisible) {
        // state.selectionManager.setFocused(true);
        state.selectionManager.setFocusedKey(item.key);
      }
    },
  });

  return (
    <li
      {...mergeProps(optionProps, hoverProps)}
      ref={ref}
      className={classNames(
        'relative cursor-default select-none', // behavior
        'py-2 pl-3 pr-9', // appearance
        'outline-none focus:bg-indigo-600 focus:text-white', // focused state
        'data-[disabled]:bg-gray-100', // disabled state
      )}
      data-selected={isSelected || undefined}
      data-hovered={isHovered || undefined}
      data-disabled={isDisabled || undefined}
    >
      <div className="flex">
        <span
          className="truncate font-normal text-gray-900 data-[selected]:font-bold data-[disabled]:text-gray-400 data-[focused]:text-white"
          data-selected={isSelected || undefined}
          data-focused={isFocused || undefined}
          data-disabled={isDisabled || undefined}
        >
          {item.rendered}
        </span>
        <span
          {...descriptionProps}
          className="ml-2 truncate text-gray-500 data-[disabled]:text-gray-400 data-[focused]:text-indigo-200"
          data-focused={isFocused || undefined}
          data-disabled={isDisabled || undefined}
        >
          @{item.type}
        </span>
      </div>
      {isSelected && (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 data-[focused]:text-white"
          data-focused={isFocused || undefined}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </li>
  );
}

function ListBoxSection<T extends object>({ item, state }: ListBoxItemProps<T>) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': item.rendered,
    'aria-label': item['aria-label'],
  });

  // Get the child items for the section. (`item.childNodes` is deprecated)
  const childNodes = state.collection.getChildren?.(item.key) ?? [];

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {item.key !== state.collection.getFirstKey() && (
        <li
          role="presentation"
          style={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <li {...itemProps}>
        {item.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px',
            }}
          >
            {item.rendered}
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
