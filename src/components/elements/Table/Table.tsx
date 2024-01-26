import { ColumnSize, TableProps } from '@react-types/table';
import React, { useCallback, useRef } from 'react';
import { AriaTableProps, useTable } from 'react-aria';
import { SelectionBehavior, useTableColumnResizeState, useTableState } from 'react-stately';
import { TableCell } from './TableCell.tsx';
import { TableColumnHeader } from './TableColumnHeader.tsx';
import { TableHeaderRow } from './TableHeaderRow.tsx';
import { TableRow } from './TableRow.tsx';
import { TableRowGroup } from './TableRowGroup.tsx';

interface TableComponentProps<T> extends AriaTableProps<T>, TableProps<T> {
  selectionBehavior?: SelectionBehavior;
  onResizeStart?: (widths: Map<React.Key, ColumnSize>) => void;
  onResize?: (widths: Map<React.Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<React.Key, ColumnSize>) => void;
  style?: React.CSSProperties;
}

export function Table<T extends object>(props: TableComponentProps<T>) {
  const ref = useRef<HTMLTableElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const state = useTableState(props);
  const { collection } = state;
  const { gridProps } = useTable({ ...props, scrollRef }, state, ref);

  // Set the minimum width of the columns to 40px
  const getDefaultMinWidth = useCallback(() => {
    return 100;
  }, []);

  const resizeState = useTableColumnResizeState({ tableWidth: 800, getDefaultMinWidth }, state);

  return (
    <div className="aria-table-wrapper" ref={scrollRef}>
      <table {...gridProps} className="aria-table" ref={ref}>
        <TableRowGroup type="thead">
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} node={headerRow} state={state}>
              {[...headerRow.childNodes].map((column) => (
                <TableColumnHeader
                  key={column.key}
                  node={column}
                  state={state}
                  resizeState={resizeState}
                  onResizeStart={props.onResizeStart}
                  onResize={props.onResize}
                  onResizeEnd={props.onResizeEnd}
                />
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup type="tbody">
          {[...collection.body.childNodes].map((row) => (
            <TableRow key={row.key} node={row} state={state}>
              {[...row.childNodes].map((cell) => (
                <TableCell key={cell.key} node={cell} state={state} resizeState={resizeState} />
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    </div>
  );
}
