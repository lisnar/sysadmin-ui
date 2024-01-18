import React from 'react';
import { AriaListBoxProps } from 'react-aria';
import { useListState } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import { ListBoxBase, PropsWithListNode } from '../../elements/ListBox';
import { SpinnerIcon } from '../../icons';

type SidebarProps<T extends object> = Omit<
  AriaListBoxProps<T>,
  'disallowEmptySelection' | 'selectionMode'
>;

interface SidebarItemProps extends PropsWithListNode {
  icon?: React.ReactSVGElement;
}

export function Sidebar<T extends object>(props: SidebarProps<T>) {
  const state = useListState({ ...props, disallowEmptySelection: true, selectionMode: 'single' });

  return (
    <div className="w-24 flex-none cursor-default select-none overflow-y-auto bg-accent-700">
      <ListBoxBase {...props} state={state} shouldFocusOnHover>
        {/* sidebar icon */}
        <div className="w-full text-center">
          <ListBoxBase.Label className="font-black leading-10 text-accent-200" />
        </div>
        <div role="presentation" className="mx-2 border-t border-accent-200" />

        <ListBoxBase.List>
          {(node) =>
            node.type === 'section' ? (
              <React.Fragment key={node.key}>
                <li role="presentation" className="mx-2 border-t border-accent-200 first:hidden" />
                <ListBoxBase.Section node={node}>
                  <ListBoxBase.Label className="sr-only" />
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

function SidebarItem({ node, icon }: SidebarItemProps) {
  return (
    <ListBoxBase.Item
      node={node}
      className="relative px-1 py-0.5 text-sm text-accent-300 outline-none first:pt-1 last:pb-1"
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
          {/* todo: placeholder icon, change later */}
          {icon ?? <SpinnerIcon size="md" aria-hidden="true" />}
          <span className="mt-2 text-xs font-medium">{item}</span>
        </div>
      )}
    </ListBoxBase.Item>
  );
}
