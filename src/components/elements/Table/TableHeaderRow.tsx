import { GridNode } from '@react-types/grid';
import React from 'react';
import { useTableHeaderRow } from 'react-aria';
import { TableState } from 'react-stately';

interface TableHeaderRowProps<T> {
  headerRow: GridNode<T>;
  children: React.ReactNode;
  state: TableState<T>;
}

export function TableHeaderRow<T>({ children, headerRow, state }: TableHeaderRowProps<T>) {
  const ref = React.useRef<HTMLTableRowElement>(null);

  // react-aria
  const { rowProps } = useTableHeaderRow({ node: headerRow }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className="sticky top-0 bg-gray-100">
      {children}
    </tr>
  );
}
