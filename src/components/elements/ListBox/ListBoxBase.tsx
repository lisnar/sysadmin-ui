import React from 'react';
import { AriaListBoxOptions, OptionAria, useListBox, useOption } from 'react-aria';
import { ListState, Node } from 'react-stately';
import { mergeRefs } from '../utils.ts';

export interface ListBoxBaseProps extends AriaListBoxOptions<object> {
  className?: string;
  state: ListState<object>;
}

export interface OptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface TextProps {
  children: string;
  className?: string;
  slot: 'label' | 'description';
}

const StateContext = React.createContext<ListState<object> | null>(null);
const NodeContext = React.createContext<Node<object> | null>(null);
const OptionContext = React.createContext<OptionAria | null>(null);

/**
 * This component is not for general use. It's used as part of ListBox and ComboBox.
 */
export const ListBoxBase = React.forwardRef<HTMLUListElement, ListBoxBaseProps>(
  ({ className, state, ...props }, forwardedRef) => {
    const ref = React.useRef<HTMLUListElement>(null);
    const { listBoxProps } = useListBox(props, state, ref);

    return (
      // TODO: label component, use context to pass `labelProps`
      <ul {...listBoxProps} ref={mergeRefs(ref, forwardedRef)} className={className}>
        <StateContext.Provider value={state}>
          {[...state.collection].map((node) => (
            <NodeContext.Provider key={node.key} value={node}>
              {node.rendered}
            </NodeContext.Provider>
          ))}
        </StateContext.Provider>
      </ul>
    );
  },
);

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
ListBoxBase.displayName = 'ListBoxBase';

export function Option({ children, className }: OptionProps) {
  const state = React.useContext(StateContext);
  const node = React.useContext(NodeContext);
  if (!state || !node) throw new Error('`Option` component must be used with `ListBoxBase`.');

  const ref = React.useRef<HTMLLIElement>(null);
  const option = useOption({ key: node.key }, state, ref);
  const { optionProps, isSelected, isFocused, isFocusVisible, isDisabled } = option;

  return (
    <OptionContext.Provider value={option}>
      <li
        {...optionProps}
        ref={ref}
        className={className}
        // The value of `data-...` attributes will be 'true' or undefined. This will simplify usage of CSS selectors.
        data-selected={isSelected || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={isDisabled || undefined}
      >
        {children}
      </li>
    </OptionContext.Provider>
  );
}

export function Text({ children, className, slot }: TextProps) {
  const option = React.useContext(OptionContext);
  if (!option) throw new Error('`Text` component must be a child of `Option`.');

  const ariaProps: Record<typeof slot, React.DOMAttributes<HTMLElement>> = {
    label: option.labelProps,
    description: option.descriptionProps,
  };

  return (
    <span {...ariaProps[slot]} className={className}>
      {children}
    </span>
  );
}
