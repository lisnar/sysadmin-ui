import React from 'react';
import {
  AriaListBoxOptions,
  OptionAria,
  useListBox,
  useListBoxSection,
  useOption,
} from 'react-aria';
import { ListState, Node } from 'react-stately';
import { FilterProps } from '../../types.ts';
import { mergeRefs } from '../utils.ts';

export interface ListBoxBaseProps extends AriaListBoxOptions<object> {
  children: React.ReactNode;
  state: ListState<object>;
}

interface LabelProps {
  children?: (item: React.ReactNode) => React.ReactNode;
  className?: string;
}

interface ListNode extends Node<object> {
  type: 'section' | 'item';
}

interface ListProps {
  children: (node: ListNode) => React.ReactNode;
  className?: string;
}

export interface PropsWithListNode {
  node: ListNode;
}

interface SectionProps extends PropsWithListNode {
  children: React.ReactNode;
  className?: string;
}

interface ItemProps extends PropsWithListNode {
  children?: (item: React.ReactNode, state: FilterProps<OptionAria, boolean>) => React.ReactNode;
  className?: string;
}

interface TextProps {
  children: string;
  className?: string;
  slot: 'label' | 'description';
}

const StateContext = React.createContext<ListState<object> | null>(null);
const LabelContext = React.createContext<{
  children: React.ReactNode;
  props: React.ComponentPropsWithoutRef<'span'>;
} | null>(null);
const ListContext = React.createContext<{
  collection: Iterable<Node<object>>;
  props: React.ComponentPropsWithoutRef<'ul'>;
  ref?: React.RefObject<HTMLUListElement>;
} | null>(null);
const TextContext = React.createContext<{
  props: Record<TextProps['slot'], React.ComponentPropsWithoutRef<'span'>>;
} | null>(null);

export function ListBoxBase({ children, state, ...props }: ListBoxBaseProps) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const listBox = useListBox(props, state, listRef);

  return (
    <LabelContext.Provider value={{ props: listBox.labelProps, children: props.label }}>
      <ListContext.Provider
        value={{
          collection: state.collection,
          props: listBox.listBoxProps,
          ref: listRef,
        }}
      >
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </ListContext.Provider>
    </LabelContext.Provider>
  );
}

function Label({ children, className }: LabelProps) {
  const label = React.useContext(LabelContext);
  if (!label) throw new Error('`Label` component must be a child of `ListBoxBase`.');

  const ChildComponent = React.useCallback(() => {
    return typeof children === 'function' ? children(label.children) : label.children;
  }, [label.children]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span {...label.props} className={className}>
      <ChildComponent />
    </span>
  );
}

function List(
  { children, className }: ListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const list = React.useContext(ListContext);
  if (!list) throw new Error('`List` component must be a child of `ListBoxBase`.');

  const ChildComponent = React.useCallback(({ node }: PropsWithListNode) => {
    return typeof children === 'function' ? children(node) : null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ul {...list.props} ref={mergeRefs(list.ref!, forwardedRef)} className={className}>
      {[...list.collection].map((node) => (
        <ChildComponent key={node.key} node={node as ListNode} />
      ))}
    </ul>
  );
}

function Section({ children, className, node }: SectionProps) {
  const state = React.useContext(StateContext);
  if (!state) throw new Error('`Section` component must be a child of `ListBoxBase`.');

  // Section's `node.rendered` is passed from `title` props of react-stately Section component.
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    'heading': !!node.rendered,
    'aria-label': node['aria-label'],
  });

  return (
    <li {...itemProps} className={className}>
      <LabelContext.Provider value={{ props: headingProps, children: node.rendered }}>
        <ListContext.Provider
          value={{
            collection: state.collection.getChildren!(node.key),
            props: groupProps,
          }}
        >
          {children}
        </ListContext.Provider>
      </LabelContext.Provider>
    </li>
  );
}

function Item({ children, className, node }: ItemProps) {
  const state = React.useContext(StateContext);
  if (!state) throw new Error('`Item` component must be a child of `ListBoxBase`.');

  const itemRef = React.useRef<HTMLLIElement>(null);
  const option = useOption({ key: node.key }, state, itemRef);
  const { optionProps, labelProps, descriptionProps, ...optionState } = option;

  const ChildComponent = React.useCallback(
    (optionState: FilterProps<OptionAria, boolean>) => {
      // Item's `node.rendered` is passed from `children` props of react-stately `Item` component.
      return typeof children === 'function' ? children(node.rendered, optionState) : node.rendered;
    },
    [node.rendered], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <li
      {...optionProps}
      ref={itemRef}
      className={className}
      // The value of `data-...` attributes will be 'true' or undefined. This will simplify usage of CSS selectors.
      data-selected={optionState.isSelected || undefined}
      data-focused={optionState.isFocused || undefined}
      data-focus-visible={optionState.isFocusVisible || undefined}
      data-disabled={optionState.isDisabled || undefined}
    >
      <TextContext.Provider value={{ props: { label: labelProps, description: descriptionProps } }}>
        <ChildComponent {...optionState} />
      </TextContext.Provider>
    </li>
  );
}

ListBoxBase.Label = Label;
ListBoxBase.List = React.forwardRef(List);
ListBoxBase.Section = Section;
ListBoxBase.Item = Item;

export { Item, Section } from 'react-stately';

export function Text({ slot, ...props }: TextProps) {
  const text = React.useContext(TextContext);
  // Children of `Item` will be rendered as `node.rendered` in `ListBoxBase.Item`.
  if (!text) throw new Error('`Text` component must be a child of `Item`.');
  return <span {...text.props[slot]} {...props} />;
}
