import { forwardRef, useRef } from 'react';
import { AriaListBoxOptions, useListBox, useListBoxSection, useOption } from 'react-aria';
import { ListState, Node } from 'react-stately';
import { CheckIcon } from '../../icons';
import { mergeRefs } from '../utils.ts';

export interface HeadlessListBoxProps<T = unknown> extends AriaListBoxOptions<T> {
  state: ListState<T>;
  className?: string;
  // TODO: Add section & option here.
  // https://youtu.be/vPRdY87_SH0
}

export const HeadlessListBox = forwardRef<HTMLUListElement, HeadlessListBoxProps>(
  ({ state, className, ...props }, forwardedRef) => {
    const ref = useRef<HTMLUListElement>(null);
    const { listBoxProps } = useListBox(props, state, ref);

    return (
      <ul {...listBoxProps} ref={mergeRefs(ref, forwardedRef)} className={className}>
        {[...state.collection].map((item) =>
          item.type === 'section' ? (
            <ListBoxSection key={item.key} item={item} state={state} />
          ) : (
            <ListBoxOption key={item.key} item={item} state={state} />
          ),
        )}
      </ul>
    );
  },
);

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
HeadlessListBox.displayName = 'HeadlessListBox';

interface HeadlessListBoxChildrenProps<T = unknown> {
  item: Node<T>;
  state: ListState<T>;
}

function ListBoxSection({ item, state }: HeadlessListBoxChildrenProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': item.rendered,
    'aria-label': item['aria-label'],
  });

  return (
    <li {...itemProps} className="pt-2">
      {item.rendered && (
        <span {...headingProps} className="mx-3 text-xs font-bold uppercase text-gray-500">
          {item.rendered}
        </span>
      )}
      <ul {...groupProps}>
        {[...state.collection.getChildren!(item.key)].map((node) => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </ul>
    </li>
  );
}

function ListBoxOption({ item, state }: HeadlessListBoxChildrenProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref,
  );

  let text = 'text-gray-700';
  if (isFocused || isSelected) {
    text = 'text-pink-600';
  } else if (isDisabled) {
    text = 'text-gray-200';
  }

  // https://stackoverflow.com/questions/76404713/how-does-a-component-takes-a-function-as-its-child
  return (
    <li
      {...optionProps}
      ref={ref}
      className={`m-1 flex cursor-default items-center justify-between rounded-md px-2 py-2 text-sm outline-none ${text} ${
        isFocused ? 'bg-pink-100' : ''
      } ${isSelected ? 'font-bold' : ''}`}
    >
      {item.rendered}
      {isSelected && <CheckIcon aria-hidden="true" className="h-5 w-5 text-pink-600" />}
    </li>
  );
}
