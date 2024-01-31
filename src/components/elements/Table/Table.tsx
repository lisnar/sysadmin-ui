import { TableProps as SpectrumTableProps } from '@react-types/table';
import React from 'react';
import { AriaTableProps, useTable } from 'react-aria';
import { SelectionBehavior, useTableColumnResizeState, useTableState } from 'react-stately';
import { TableCell } from './TableCell.tsx';
import { TableHeader } from './TableHeader.tsx';
import { TableHeaderRow } from './TableHeaderRow.tsx';
import { TableRow } from './TableRow.tsx';
import { TableRowGroup } from './TableRowGroup.tsx';

interface TableProps<T> extends AriaTableProps<T>, SpectrumTableProps<T> {
  selectionBehavior?: SelectionBehavior;
  style?: React.CSSProperties;
}

export function Table<T extends object>(props: TableProps<T>) {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const getDefaultMinWidth = React.useCallback(() => 80, []);

  // react-aria
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' && props.selectionBehavior !== 'replace',
  });
  const { gridProps } = useTable({ ...props, scrollRef }, state, tableRef);
  const resizeState = useTableColumnResizeState({ tableWidth: 800, getDefaultMinWidth }, state);
  const { collection } = state;

  return (
    <div ref={scrollRef} className="w-fit overflow-auto rounded-md border shadow-md">
      <table {...gridProps} className="border-separate border-spacing-0" ref={tableRef}>
        <TableRowGroup type="thead">
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} headerRow={headerRow} state={state}>
              {[...collection.getChildren!(headerRow.key)].map((header) => (
                <TableHeader
                  key={header.key}
                  header={header}
                  state={state}
                  resizeState={resizeState}
                />
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>

        <TableRowGroup type="tbody">
          {/* `childNodes` is deprecated, but no good alternative for this one */}
          {[...collection.body.childNodes].map((row) => (
            <TableRow key={row.key} row={row} state={state}>
              {[...collection.getChildren!(row.key)].map((cell) => (
                <TableCell key={cell.key} cell={cell} state={state} resizeState={resizeState} />
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    </div>
  );
}
