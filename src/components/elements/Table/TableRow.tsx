import { GridNode } from '@react-types/grid';
import React from 'react';
import { mergeProps, useFocusRing, useTableRow } from 'react-aria';
import { TableState } from 'react-stately';
import { classNames } from '../../utils.ts';

interface TableRowProps<T> {
  row: GridNode<T>;
  state: TableState<T>;
  children: React.ReactNode;
}

export function TableRow<T>({ children, row, state }: TableRowProps<T>) {
  const ref = React.useRef<HTMLTableRowElement>(null);

  // react-aria
  const { rowProps } = useTableRow({ node: row }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isSelected = state.selectionManager.isSelected(row.key);

  return (
    <tr
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={classNames(
        'outline-none -outline-offset-4',
        isFocusVisible && 'outline-accent-600',
        isSelected ? 'bg-accent-200' : 'odd:bg-white even:bg-gray-100',
      )}
    >
      {children}
    </tr>
  );
}
