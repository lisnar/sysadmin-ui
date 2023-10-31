import React from 'react';
import { AriaListBoxProps } from 'react-aria';
import { useListState } from 'react-stately';
import { CheckIcon } from '../../icons';
import { ListBoxBase, ListBoxBaseProps, PropsWithListNode } from './ListBoxBase.tsx';

export function ListBox<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  return <ListBoxInner {...props} state={state} />;
}

export const ListBoxInner = React.forwardRef<HTMLUListElement, Omit<ListBoxBaseProps, 'children'>>(
  (props, forwardedRef) => (
    <ListBoxBase {...props} shouldFocusOnHover>
      <ListBoxBase.Label className="block text-left text-sm font-medium text-gray-700" />
      <ListBoxBase.List
        ref={forwardedRef}
        className="max-h-96 w-60 overflow-auto rounded-md border shadow-md outline-none"
      >
        {(node) =>
          node.type === 'section' ? (
            <ListBoxBase.Section key={node.key} node={node} className="pt-2">
              <ListBoxBase.Label className="mx-3 text-xs font-bold uppercase text-gray-500" />
              <ListBoxBase.List>
                {(node) => <ListBoxBaseItem key={node.key} node={node} />}
              </ListBoxBase.List>
            </ListBoxBase.Section>
          ) : (
            <ListBoxBaseItem key={node.key} node={node} />
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

function ListBoxBaseItem({ node }: PropsWithListNode) {
  return (
    <ListBoxBase.Item
      node={node}
      className="m-1 flex cursor-default items-center justify-between rounded-md px-2 py-2 text-sm text-gray-700 outline-none data-[focused]:bg-pink-100 data-[selected]:font-bold data-[disabled]:text-gray-200 data-[focused]:text-pink-600 data-[selected]:text-pink-600"
    >
      {(item, state) => (
        <>
          {item}
          {state.isSelected && <CheckIcon aria-hidden="true" className="h-5 w-5 text-pink-600" />}
        </>
      )}
    </ListBoxBase.Item>
  );
}
