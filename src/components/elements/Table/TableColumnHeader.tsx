import { ColumnSize } from '@react-types/table';
import React from 'react';
import { AriaTableColumnHeaderProps, useTableColumnHeader } from 'react-aria';
import { TableColumnResizeState, TableState } from 'react-stately';
import { classNames } from '../../utils.ts';
import { ButtonBase } from '../Button';
import { Resizer } from './Resizer.tsx';

interface TableColumnHeaderProps<T> extends AriaTableColumnHeaderProps<T> {
  state: TableState<T>;
  resizeState: TableColumnResizeState<T>;
  onResizeStart?: (widths: Map<React.Key, ColumnSize>) => void;
  onResize?: (widths: Map<React.Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<React.Key, ColumnSize>) => void;
}

export function TableColumnHeader<T>({
  node,
  state,
  resizeState,
  onResizeStart,
  onResize,
  onResizeEnd,
}: TableColumnHeaderProps<T>) {
  const ref = React.useRef<HTMLTableCellElement>(null);

  // react-aria
  const { columnHeaderProps } = useTableColumnHeader({ node }, state, ref);
  const allowsResizing = node.props.allowsResizing as boolean; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

  const sortIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';
  const sortVisible = state.sortDescriptor?.column === node.key ? 'visible' : 'hidden';

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
      className="sticky top-0 cursor-default whitespace-nowrap p-1 text-left font-bold"
      style={{ width: resizeState.getColumnWidth(node.key) }}
    >
      <div className="relative flex items-center justify-center">
        <ButtonBase
          onPress={() => state.sort(node.key)}
          className="w-full cursor-default truncate rounded-sm p-1 text-left text-xs font-semibold uppercase text-gray-600 ring-accent-600 data-focused:outline-none data-focused:ring-2"
        >
          <span aria-hidden="true" className={classNames('mr-1', sortVisible)}>
            {sortIcon}
          </span>
          {node.rendered}
        </ButtonBase>

        {allowsResizing && (
          <Resizer
            column={node}
            resizeState={resizeState}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
          />
        )}
      </div>
    </th>
  );
}
