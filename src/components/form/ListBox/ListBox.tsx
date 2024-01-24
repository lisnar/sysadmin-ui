import React from 'react';
import { AriaListBoxProps } from 'react-aria';
import { Section, useListState, useTreeData } from 'react-stately';
import { ListBoxBase } from './ListBoxBase.tsx';
import { renderOption } from './renderOption.tsx';

export interface Option {
  key: string; // `selectedKeys` and `disabledKeys` don't work with number elements
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  children?: Option[];
}

export interface ListBoxProps
  extends Omit<AriaListBoxProps<Option>, 'children' | 'items' | 'onSelectionChange'> {
  options: Option[];
  defaultSelectedKeys?: Iterable<string>;
  selectedKeys?: Iterable<string>; // exclude "all" value
  onSelectionChange?: (keys: Iterable<string>) => void;
}

export function ListBox({
  options,
  defaultSelectedKeys,
  selectedKeys,
  onSelectionChange,
  ...props
}: ListBoxProps) {
  const data = useTreeData<Option>({
    initialItems: options,
    initialSelectedKeys: defaultSelectedKeys,
    getKey: (item) => item.key,
    getChildren: (item) => item.children ?? [],
  });

  return (
    <ListBoxAria
      items={data.items}
      selectedKeys={selectedKeys ?? data.selectedKeys}
      onSelectionChange={(keys) => (onSelectionChange ?? data.setSelectedKeys)(keys as Set<string>)}
      {...props}
    >
      {(node) => (
        <Section key={node.key} title={node.value.label} items={node.children}>
          {(node) => renderOption(node.key, node.value)}
        </Section>
      )}
    </ListBoxAria>
  );
}

export function ListBoxAria<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  return <ListBoxBase {...props} state={state} shouldFocusOnHover />;
}
