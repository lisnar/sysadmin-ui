import React from 'react';
import {
  AriaTableColumnResizeProps,
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useHover,
  useTableColumnResize,
} from 'react-aria';
import { TableColumnResizeState } from 'react-stately';
import { twMerge } from 'tailwind-merge';
import { mergeRefs } from '../../utils.ts';

interface ResizerProps<T> extends Omit<AriaTableColumnResizeProps<T>, 'aria-label'> {
  resizeState: TableColumnResizeState<T>;
}

export const Resizer = React.forwardRef(function Resizer<T>(
  { column, resizeState, ...props }: ResizerProps<T>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>(null);

  // react-aria
  const { resizerProps, inputProps } = useTableColumnResize(
    { 'aria-label': 'Resizer', column, ...props },
    resizeState,
    ref,
  );
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const isResizing = resizeState.resizingColumn === column.key || undefined;

  return (
    <div
      {...mergeProps(resizerProps, hoverProps)}
      role="presentation"
      className="absolute inset-y-0 -right-0.5 flex cursor-col-resize justify-center rounded-sm px-1.5 py-1 ring-accent-600 data-focus-visible:ring-2"
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <div
        className={twMerge('rounded border-l border-gray-300', isResizing && 'border-gray-400')}
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
