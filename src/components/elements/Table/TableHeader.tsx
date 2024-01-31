import { GridNode } from '@react-types/grid';
import React from 'react';
import { useTableColumnHeader } from 'react-aria';
import { TableColumnResizeState, TableState } from 'react-stately';
import { classNames } from '../../utils.ts';
import { ButtonBase } from '../Button';
import { Resizer } from './Resizer.tsx';

interface TableHeaderProps<T> {
  header: GridNode<T>;
  state: TableState<T>;
  resizeState: TableColumnResizeState<T>;
}

export function TableHeader<T>({ header, state, resizeState }: TableHeaderProps<T>) {
  const ref = React.useRef<HTMLTableCellElement>(null);

  // react-aria
  const { columnHeaderProps } = useTableColumnHeader({ node: header }, state, ref);
  const width = resizeState.getColumnWidth(header.key);
  const sortIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';
  const sortVisible = state.sortDescriptor?.column === header.key ? 'inline' : 'hidden';

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
      style={{ width, maxWidth: width }}
      className="sticky top-0 border-b border-gray-300 p-1"
    >
      <div className="relative">
        <ButtonBase
          onPress={() => state.sort(header.key)}
          className="h-full w-full cursor-default rounded-sm px-1 py-1.5 text-xs font-semibold uppercase text-gray-600 outline-none data-focus-visible:ring-2 data-focus-visible:ring-accent-600"
        >
          <div className="mr-3 truncate">
            <span aria-hidden="true" className={classNames('mr-1', sortVisible)}>
              {sortIcon}
            </span>
            {header.rendered}
          </div>
        </ButtonBase>

        <Resizer column={header} resizeState={resizeState} />
      </div>
    </th>
  );
}
