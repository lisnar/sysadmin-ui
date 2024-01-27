import React from 'react';
import { useTableRowGroup } from 'react-aria';

interface TableRowGroupProps {
  type: React.ElementType;
  children: React.ReactNode;
  onScroll?: () => void;
  className?: string;
}

export const TableRowGroup = React.forwardRef(function TableRowGroup(
  { type: Element, children, className, onScroll }: TableRowGroupProps,
  forwardedRef: React.ForwardedRef<unknown>,
) {
  // react-aria
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Element {...rowGroupProps} ref={forwardedRef} onScroll={onScroll} className={className}>
      {children}
    </Element>
  );
});
