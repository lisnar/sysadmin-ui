import React from 'react';
import { AriaListBoxProps } from 'react-aria';
import { useListState, useTreeData } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import { Item, ListBoxBase, PropsWithListNode, Section, Text } from '../../elements/ListBox';

export interface SidebarEntity {
  id: number;
  name: string;
  icon?: React.ReactNode;
  children?: SidebarEntity[];
}

interface SidebarProps {
  data: SidebarEntity[];
  selectedId?: number;
}

type SidebarInnerProps<T extends object> = Omit<
  AriaListBoxProps<T>,
  'disallowEmptySelection' | 'selectionMode'
>;

export function Sidebar({ data, selectedId }: SidebarProps) {
  const tree = useTreeData<SidebarEntity>({
    initialItems: data,
    initialSelectedKeys: [String(selectedId)],
    getKey: (item) => item.id,
    getChildren: (item) => item.children ?? [],
  });

  return (
    <SidebarInner
      label="Sidebar"
      items={tree.items}
      selectedKeys={tree.selectedKeys}
      onSelectionChange={(keys) => keys !== 'all' && tree.setSelectedKeys(keys)}
    >
      {(node) =>
        node.value.children ? (
          <Section key={node.key} title={node.value.name} items={node.children}>
            {(node) => (
              <Item key={node.key}>
                <div className="text-blue-600 h-5 w-5">{node.value.icon}</div>
                <span className="mt-2 text-xs font-medium">{node.value.name}</span>
              </Item>
            )}
          </Section>
        ) : (
          <Item key={node.key}>
            <div className="text-blue-600 h-5 w-5">{node.value.icon}</div>
            <Text slot="label" className="mt-2 text-xs font-medium">
              {node.value.name}
            </Text>
          </Item>
        )
      }
    </SidebarInner>
  );
}

export function SidebarInner<T extends object>(props: SidebarInnerProps<T>) {
  const state = useListState({ ...props, disallowEmptySelection: true, selectionMode: 'single' });

  return (
    <div className="w-24 flex-none cursor-default select-none overflow-y-auto bg-accent-700">
      <ListBoxBase {...props} state={state} shouldFocusOnHover shouldFocusWrap>
        {/* sidebar icon */}
        <div className="w-full text-center">
          <ListBoxBase.Label className="font-black leading-10 text-accent-200" />
        </div>
        <div role="presentation" className="mx-2 border-t border-accent-200" />

        <ListBoxBase.List>
          {(node) =>
            node.type === 'section' ? (
              <React.Fragment key={node.key}>
                <li
                  role="presentation"
                  className="mx-2 mt-0.5 border-t border-accent-200 first:hidden"
                />
                <ListBoxBase.Section node={node} className="text-center">
                  <ListBoxBase.Label className="text-xs font-bold uppercase text-accent-300" />
                  <ListBoxBase.List>
                    {(node) => <SidebarItem key={node.key} node={node} />}
                  </ListBoxBase.List>
                </ListBoxBase.Section>
              </React.Fragment>
            ) : (
              <SidebarItem key={node.key} node={node} />
            )
          }
        </ListBoxBase.List>
      </ListBoxBase>
    </div>
  );
}

function SidebarItem({ node }: PropsWithListNode) {
  return (
    <ListBoxBase.Item
      node={node}
      className="group relative px-1 py-0.5 text-sm text-accent-300 outline-none first:pt-1 last:pb-1"
    >
      {(item, state) => (
        <div
          className={twMerge(
            'group flex flex-col items-center rounded-lg border border-accent-400 bg-accent-700 p-3 text-center text-accent-100',
            state.isFocused && 'bg-accent-600 text-white',
            state.isFocusVisible && 'ring-1 ring-accent-300',
            state.isSelected && 'bg-accent-900 text-white shadow-inner',
            state.isDisabled && 'cursor-not-allowed text-accent-400',
          )}
        >
          {item}
        </div>
      )}
    </ListBoxBase.Item>
  );
}
