import React from 'react';
import { GridRowProps, useTableHeaderRow } from 'react-aria';
import { TableState } from 'react-stately';

interface TableHeaderRowProps<T> extends Pick<GridRowProps<T>, 'node'> {
  children: React.ReactNode;
  state: TableState<T>;
}

export function TableHeaderRow<T>({ children, node, state }: TableHeaderRowProps<T>) {
  const ref = React.useRef<HTMLTableRowElement>(null);

  // react-aria
  const { rowProps } = useTableHeaderRow({ node }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className="border-b border-solid border-gray-300 bg-gray-100">
      {children}
    </tr>
  );
}
