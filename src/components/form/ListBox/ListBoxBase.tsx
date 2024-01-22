import React from 'react';
import { AriaListBoxOptions, useListBox, useListBoxSection, useOption } from 'react-aria';
import { ListState, Node } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import { CheckIcon } from '../../icons';
import { classNames, mergeRefs } from '../../utils.ts';
import { fieldContainerStyle, fieldInputStyle, fieldLabelStyle } from '../style.ts';

interface ListBoxBaseProps<T extends object> extends AriaListBoxOptions<T> {
  className?: string;
  state: ListState<T>;
}

interface ListBoxItemProps<T extends object> {
  node: Node<T>;
  state: ListState<T>;
}

export const ListBoxBase = React.forwardRef(function ListBoxBase<T extends object>(
  { className, state, ...props }: ListBoxBaseProps<T>,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const { labelProps, listBoxProps } = useListBox(props, state, listRef);

  return (
    <div className={twMerge(fieldContainerStyle, className)}>
      {/* listbox label (optional) */}
      {props.label && (
        <span {...labelProps} className={classNames(fieldLabelStyle, 'relative -top-1')}>
          {props.label}
        </span>
      )}
      {/* listbox */}
      <ul
        {...listBoxProps}
        ref={mergeRefs(listRef, forwardedRef)}
        className={classNames(fieldInputStyle, 'overflow-auto py-1')}
        data-focused={state.selectionManager.isFocused || undefined}
      >
        {[...state.collection].map((node) =>
          node.type === 'section' ? (
            <OptionGroup key={node.key} node={node} state={state} />
          ) : (
            <Option key={node.key} node={node} state={state} />
          ),
        )}
      </ul>
    </div>
  );
});

function OptionGroup<T extends object>({ node, state }: ListBoxItemProps<T>) {
  // `node.rendered` is passed from `title` props of react-stately `Section` component.
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': !!node.rendered,
    'aria-label': node['aria-label'],
  });

  return (
    <>
      {/* separator */}
      <li role="presentation" className="mx-2 my-1 border-t border-gray-300 first:hidden" />

      <li {...itemProps}>
        {/* group heading (optional) */}
        {node.rendered && (
          <span {...headingProps} className="mx-3 text-xs font-bold uppercase text-gray-500">
            {node.rendered}
          </span>
        )}
        {/* group list */}
        <ul {...groupProps}>
          {[...state.collection.getChildren!(node.key)].map((node) => (
            <Option key={node.key} node={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option<T extends object>({ node, state }: ListBoxItemProps<T>) {
  const itemRef = React.useRef<HTMLLIElement>(null);
  const option = useOption({ key: node.key }, state, itemRef);
  const { optionProps, isSelected, isFocused, isDisabled } = option;

  return (
    <li
      {...optionProps}
      ref={itemRef}
      className="group relative py-2 pl-3 pr-9 text-sm text-gray-900 outline-none data-focused:bg-accent-600 data-focused:text-white data-disabled:pointer-events-none data-disabled:text-gray-400"
      // `data-...` attributes should be 'true' or undefined to simplify CSS selectors.
      data-selected={isSelected || undefined}
      data-focused={isFocused || undefined}
      data-disabled={isDisabled || undefined}
    >
      {/* displayed text */}
      {node.rendered}
      {/* selection mark */}
      {isSelected && (
        <CheckIcon
          size="sm"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-600 group-data-focused:text-white"
          aria-hidden="true"
        />
      )}
    </li>
  );
}
