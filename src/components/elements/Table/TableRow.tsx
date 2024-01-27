import React from 'react';
import { GridRowProps, mergeProps, useFocusRing, useTableRow } from 'react-aria';
import { TableState } from 'react-stately';

interface TableRowProps<T> extends Pick<GridRowProps<T>, 'node'> {
  children: React.ReactNode;
  state: TableState<T>;
}

export function TableRow<T>({ children, node, state }: TableRowProps<T>) {
  const ref = React.useRef<HTMLTableRowElement>(null);

  // react-aria
  const { rowProps, isPressed } = useTableRow({ node }, state, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isSelected = state.selectionManager.isSelected(node.key);

  return (
    <tr
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className="group cursor-default outline-none -outline-offset-4 even:bg-gray-100 data-focused:outline-accent-600 data-selected:bg-accent-200"
      data-pressed={isPressed || undefined}
      data-selected={isSelected || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      {children}
    </tr>
  );
}
