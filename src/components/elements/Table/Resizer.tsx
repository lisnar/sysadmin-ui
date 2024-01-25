import React from 'react';
import { AriaTableColumnResizeProps, VisuallyHidden, useTableColumnResize } from 'react-aria';
import { TableColumnResizeState } from 'react-stately';
import { classNames, mergeRefs } from '../../utils.ts';

interface ResizerProps<T> extends Omit<AriaTableColumnResizeProps<T>, 'aria-label'> {
  resizeState: TableColumnResizeState<T>;
  showResizer: boolean;
}

export const Resizer = React.forwardRef(function Resizer<T>(
  { column, resizeState, showResizer, ...props }: ResizerProps<T>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>(null);
  const { resizerProps, inputProps } = useTableColumnResize(
    { 'aria-label': 'Resizer', column, ...props },
    resizeState,
    ref,
  );

  return (
    <div
      {...resizerProps}
      role="presentation"
      className={classNames(
        resizeState.resizingColumn === column.key ? 'border-[orange]' : 'border-slate-800',
        showResizer ? 'visible' : 'invisible',
        'box-border h-auto w-[6px] flex-[0_0_auto] cursor-col-resize touch-none border-2',
      )}
      style={{
        marginInlineStart: '4px',
        borderStyle: 'none solid',
      }}
    >
      <VisuallyHidden>
        <input ref={mergeRefs(ref, forwardedRef)} type="range" {...inputProps} />
      </VisuallyHidden>
    </div>
  );
});
