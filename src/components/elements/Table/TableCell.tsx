import React from 'react';
import { AriaTableCellProps, mergeProps, useFocusRing, useTableCell } from 'react-aria';
import { TableColumnResizeState, TableState } from 'react-stately';
import { classNames } from '../../utils.ts';

interface TableCellProps<T> extends Pick<AriaTableCellProps, 'node'> {
  state: TableState<T>;
  resizeState: TableColumnResizeState<T>;
}

export function TableCell<T>({ node, state, resizeState }: TableCellProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { gridCellProps } = useTableCell({ node }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...mergeProps(gridCellProps, focusProps)}
      ref={ref}
      className={classNames(
        `w-[${resizeState.getColumnWidth(node.column!.key)}px]`,
        isFocusVisible ? 'shadow-[inset_0_0_0_2px_orange]' : 'shadow-none',
        'box-border flex-[0_0_auto] cursor-default truncate px-2.5 py-1 outline-none',
      )}
    >
      {node.rendered}
    </div>
  );
}
