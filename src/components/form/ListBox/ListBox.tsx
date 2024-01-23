import { AriaListBoxProps } from 'react-aria';
import { Item, Section, useListState, useTreeData } from 'react-stately';
import { ListBoxBase } from './ListBoxBase.tsx';

export interface Option {
  key: string; // `selectedKeys` and `disabledKeys` don't work with number elements
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
      {/* todo: handle `node.value.description` */}
      {(node) => (
        <Section key={node.key} title={node.value.label} items={node.children}>
          {(node) => <Item key={node.key}>{node.value.label ?? node.value.key}</Item>}
        </Section>
      )}
    </ListBoxAria>
  );
}

export function ListBoxAria<T extends object>(props: AriaListBoxProps<T>) {
  const state = useListState(props);
  return <ListBoxBase {...props} state={state} shouldFocusOnHover />;
}
