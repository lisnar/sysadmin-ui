import { GridNode } from '@react-types/grid';
import React from 'react';
import { mergeProps, useFocusRing, useTableCell } from 'react-aria';
import { TableColumnResizeState, TableState } from 'react-stately';

interface TableCellProps<T> {
  cell: GridNode<T>;
  state: TableState<T>;
  resizeState?: TableColumnResizeState<T>;
}

export function TableCell<T>({ cell, state, resizeState }: TableCellProps<T>) {
  const ref = React.useRef<HTMLTableCellElement>(null);

  // react-aria
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  const width = resizeState?.getColumnWidth(cell.column!.key);

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      ref={ref}
      className="px-2 py-1 text-sm outline-none -outline-offset-4 data-focused:outline-accent-600"
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <div className="truncate" style={{ width }}>
        {cell.rendered}
      </div>
    </td>
  );
}
