import React from 'react';
import {
  AriaTableCellProps,
  AriaTableColumnHeaderProps,
  useTableCell,
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox,
  VisuallyHidden,
} from 'react-aria';
import type { TableColumnResizeState, TableState } from 'react-stately';
import { Checkbox } from '../../form/Checkbox';

interface TableCheckboxCellProps<T> extends Pick<AriaTableCellProps, 'node'> {
  state: TableState<T>;
  resizeState: TableColumnResizeState<T>;
}

interface TableSelectAllCellProps<T> extends Pick<AriaTableColumnHeaderProps<T>, 'node'> {
  state: TableState<T>;
  resizeState: TableColumnResizeState<T>;
}

export function TableCheckboxCell<T>({ node, state, resizeState }: TableCheckboxCellProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);

  // react-aria
  const { gridCellProps } = useTableCell({ node }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox({ key: node.parentKey! }, state);

  return (
    <div
      {...gridCellProps}
      className={`w-[${resizeState.getColumnWidth(node.column!.key)}px] box-border flex`}
      ref={ref}
    >
      <Checkbox {...checkboxProps} className="mx-1 my-auto" />
    </div>
  );
}

export function TableSelectAllCell<T>({ node, state, resizeState }: TableSelectAllCellProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { columnHeaderProps } = useTableColumnHeader({ node }, state, ref);
  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <div
      {...columnHeaderProps}
      className={`w-[${resizeState.getColumnWidth(node.key)}px] m-auto box-border`}
      ref={ref}
    >
      {state.selectionManager.selectionMode === 'single' ? (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} className="mx-1 my-auto" />
      )}
    </div>
  );
}
