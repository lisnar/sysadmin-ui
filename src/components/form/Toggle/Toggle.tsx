import React from 'react';
import { AriaSwitchProps, mergeProps, useFocusRing, useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { classNames } from '../../utils.ts';

export function Toggle(props: AriaSwitchProps) {
  const ref = React.useRef(null);
  const state = useToggleState(props);
  const { inputProps, isSelected } = useSwitch(props, state, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  return (
    <label
      className="group inline-flex select-none items-center"
      data-selected={isSelected || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      {/* visually hidden input */}
      <input {...mergeProps(inputProps, focusProps)} ref={ref} className="sr-only" />

      {/* toggle container */}
      <span
        className={classNames(
          'transition duration-75',
          'h-6 w-11 flex-none p-0.5',
          'cursor-pointer rounded-full border-transparent bg-gray-300 shadow-inner',
          'group-data-focused:outline-none group-data-focused:ring-2 group-data-focused:ring-accent-500 group-data-focused:ring-offset-2',
          'group-data-selected:bg-accent-600',
        )}
      >
        {/* toggle circle */}
        {/* prettier-ignore */}
        <span aria-hidden="true" className="pointer-events-none relative inline-flex h-5 w-5 translate-x-0 transform items-center justify-center rounded-full bg-white shadow transition duration-150 group-data-selected:translate-x-5">
          {/* cross icon */}
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" className="absolute h-3 w-3 text-gray-400 opacity-100 transition duration-150 group-data-selected:opacity-0">
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" />
          </svg>
          {/* check icon */}
          <svg viewBox="0 0 12 12" fill="currentColor" className="absolute h-3 w-3 text-accent-600 opacity-0 transition duration-150 group-data-selected:opacity-100">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>

      {/* label text */}
      <span className="ml-3 text-sm">{props.children}</span>
    </label>
  );
}
