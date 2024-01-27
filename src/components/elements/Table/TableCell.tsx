import { GridNode } from '@react-types/grid';
import React from 'react';
import { mergeProps, useFocusRing, useTableCell } from 'react-aria';
import { TableColumnResizeState, TableState } from 'react-stately';
import { classNames } from '../../utils.ts';

interface TableCellProps<T> {
  cell: GridNode<T>;
  state: TableState<T>;
  resizeState?: TableColumnResizeState<T>;
}

export function TableCell<T>({ cell, state, resizeState }: TableCellProps<T>) {
  const ref = React.useRef<HTMLTableCellElement>(null);

  // react-aria
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const width = resizeState?.getColumnWidth(cell.column!.key);

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      ref={ref}
      style={{ width, maxWidth: width }}
      className={classNames(
        'px-2 py-1 text-sm outline-none -outline-offset-4',
        isFocusVisible && 'outline-accent-600',
      )}
    >
      <div className="truncate">{cell.rendered}</div>
    </td>
  );
}
