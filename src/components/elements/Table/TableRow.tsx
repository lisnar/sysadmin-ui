import React from 'react';
import { GridRowProps, mergeProps, useFocusRing, useTableRow } from 'react-aria';
import { TableState } from 'react-stately';

interface TableRowProps<T> extends Pick<GridRowProps<T>, 'node'> {
  children: React.ReactNode;
  state: TableState<T>;
}

export function TableRow<T>({ children, node, state }: TableRowProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rowProps, isPressed } = useTableRow({ node }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isSelected = state.selectionManager.isSelected(node.key);

  let background;
  let color;
  if (isSelected) {
    color = 'text-white';
    background = 'bg-violet-800';
  } else if (isPressed) {
    background = 'bg-slate-400';
  } else {
    if (node.index! % 2) {
      background = 'bg-slate-200';
    } else {
      background = 'none';
    }
  }

  const boxShadow = isFocusVisible ? 'shadow-[inset_0_0_0_2px_orange]' : 'shadow-none';

  return (
    <div
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={`${background} ${color} outline-none ${boxShadow} flex w-fit`}
    >
      {children}
    </div>
  );
}
