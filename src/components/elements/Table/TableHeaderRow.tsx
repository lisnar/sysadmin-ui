import React from 'react';
import { GridRowProps, useTableHeaderRow } from 'react-aria';
import { TableState } from 'react-stately';

interface TableHeaderRowProps<T> extends Pick<GridRowProps<T>, 'node'> {
  children: React.ReactNode;
  state: TableState<T>;
}

export function TableHeaderRow<T>({ children, node, state }: TableHeaderRowProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rowProps } = useTableHeaderRow({ node }, state, ref);

  return (
    <div {...rowProps} ref={ref} className="border-slate-800 flex w-fit border-b-2 border-solid">
      {children}
    </div>
  );
}
