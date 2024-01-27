import { GridNode } from '@react-types/grid';
import React from 'react';
import {
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useHover,
  useTableColumnResize,
} from 'react-aria';
import { TableColumnResizeState } from 'react-stately';
import { classNames, mergeRefs } from '../../utils.ts';

interface ResizerProps<T> {
  column: GridNode<T>;
  resizeState: TableColumnResizeState<T>;
}

export const Resizer = React.forwardRef(function Resizer<T>(
  { column, resizeState, ...props }: ResizerProps<T>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>(null);

  // react-aria
  const { resizerProps, inputProps } = useTableColumnResize(
    { 'aria-label': 'Column Resizer', column, ...props },
    resizeState,
    ref,
  );
  const { hoverProps } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isResizing = resizeState.resizingColumn === column.key || undefined;

  return (
    <div
      {...mergeProps(resizerProps, hoverProps)}
      role="presentation"
      className={classNames(
        // use padding to make resizer area larger
        'absolute inset-y-0 right-0 cursor-col-resize rounded-sm p-1',
        isFocusVisible && 'ring-2 ring-accent-600',
      )}
    >
      {/* visual resizer line */}
      <div
        className={classNames(
          'h-full border-l',
          isResizing ? 'border-gray-600' : 'border-gray-300',
        )}
      />

      <VisuallyHidden>
        <input
          {...mergeProps(inputProps, focusProps)}
          ref={mergeRefs(ref, forwardedRef)}
          type="range"
        />
      </VisuallyHidden>
    </div>
  );
});
