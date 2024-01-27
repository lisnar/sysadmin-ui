import React from 'react';
import { useTableRowGroup } from 'react-aria';

interface TableRowGroupProps {
  type: React.ElementType;
  children: React.ReactNode;
}

export const TableRowGroup = React.forwardRef(function TableRowGroup(
  { type: Element, children }: TableRowGroupProps,
  forwardedRef: React.ForwardedRef<unknown>,
) {
  // react-aria
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Element {...rowGroupProps} ref={forwardedRef}>
      {children}
    </Element>
  );
});
