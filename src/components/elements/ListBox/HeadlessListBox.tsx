import React from 'react';
import { Item, useListState } from 'react-stately';
import { ListBoxBase, ListBoxBaseProps } from './ListBoxBase.tsx';

export interface HeadlessListBoxProps extends Omit<ListBoxBaseProps, 'state'> {
  children?: React.ReactNode;
}

/**
 * Convert children to make them compatible with `react-stately` collection state hooks.
 */
function intoCollectionChildren(children: React.ReactNode) {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => <Item key={child.key}>{child}</Item>);
}

export function HeadlessListBox({ children, ...props }: HeadlessListBoxProps) {
  const state = useListState({ ...props, children: intoCollectionChildren(children) });
  // Each child element will be rendered as `node.rendered` in `ListBoxBase`.
  return <ListBoxBase {...props} state={state} shouldFocusOnHover />;
}

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
HeadlessListBox.displayName = 'HeadlessListBox';

// TODO: HeadlessSection
