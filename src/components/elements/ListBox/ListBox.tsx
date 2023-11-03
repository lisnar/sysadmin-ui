import React from 'react';
import { AriaListBoxProps } from 'react-aria';
import { useListState } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import { CheckIcon } from '../../icons';
import { classNames } from '../utils.ts';
import { ListBoxBase, ListBoxBaseProps, PropsWithListNode } from './ListBoxBase.tsx';

interface ListBoxInnerProps extends Omit<ListBoxBaseProps, 'children' | 'label'> {
  className?: string;
}

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  return (
    <div className="w-60">
      <ListBoxInner {...props} state={state} />
    </div>
  );
}

export const ListBoxInner = React.forwardRef<HTMLUListElement, ListBoxInnerProps>(
  ({ className, ...props }, forwardedRef) => (
    <ListBoxBase {...props} shouldFocusOnHover>
      <ListBoxBase.Label className="mx-3 text-sm font-medium text-gray-700" />
      <ListBoxBase.List
        ref={forwardedRef}
        className={twMerge(
          'cursor-default select-none overflow-auto border py-1', // behavior & layout
          'rounded-md border-gray-200 bg-white shadow-md', // appearance
          className,
        )}
      >
        {(node) =>
          node.type === 'section' ? (
            <React.Fragment>
              <li role="presentation" className="mx-2 my-1 border-t border-gray-300 first:hidden" />
              <ListBoxBase.Section key={node.key} node={node}>
                <ListBoxBase.Label className="mx-3 text-xs font-bold uppercase text-gray-500" />
                <ListBoxBase.List>
                  {(node) => <ListBoxItem key={node.key} node={node} />}
                </ListBoxBase.List>
              </ListBoxBase.Section>
            </React.Fragment>
          ) : (
            <ListBoxItem key={node.key} node={node} />
          )
        }
      </ListBoxBase.List>
    </ListBoxBase>
  ),
);

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
ListBoxInner.displayName = 'ListBoxInner';

function ListBoxItem({ node }: PropsWithListNode) {
  return (
    <ListBoxBase.Item
      node={node}
      className={classNames(
        'relative py-2 pl-3 pr-9 text-sm', // layout
        'outline-none data-focused:bg-indigo-600 data-focused:text-white', // focused state
        'data-disabled:pointer-events-none data-disabled:text-gray-400', // disabled state
      )}
    >
      {(item, state) => (
        <React.Fragment>
          {item}
          {state.isSelected && (
            <CheckIcon
              size="sm"
              className={classNames(
                'absolute right-3 top-1/2 -translate-y-1/2',
                state.isFocused ? 'text-white' : 'text-indigo-600',
              )}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      )}
    </ListBoxBase.Item>
  );
}
