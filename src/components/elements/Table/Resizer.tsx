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
  className?: string;
  resizeState: TableColumnResizeState<T>;
  showResizer?: boolean;
}

export const Resizer = React.forwardRef(function Resizer<T>(
  { className, column, resizeState, showResizer = true, ...props }: ResizerProps<T>,
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

  return (
    <div
      {...mergeProps(resizerProps, hoverProps)}
      role="presentation"
      className={twMerge(
        resizeState.resizingColumn === column.key
          ? 'border-[orange]'
          : isFocused
            ? 'border-accent-500'
            : 'border-slate-800',
        showResizer ? 'visible' : 'hidden',
        'box-border h-auto w-[6px] flex-[0_0_auto] cursor-col-resize touch-none border-2',
        className,
      )}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
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
