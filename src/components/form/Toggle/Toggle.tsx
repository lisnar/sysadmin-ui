import React from 'react';
import { AriaSwitchProps, mergeProps, useFocusRing, useSwitch, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';
import { classNames } from '../../utils.ts';

export function Toggle(props: AriaSwitchProps) {
  const ref = React.useRef(null);
  const state = useToggleState(props);
  const { inputProps, isSelected } = useSwitch(props, state, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  return (
    <label
      className="inline-flex select-none items-center"
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>

      {/* toggle container */}
      <span
        className={classNames(
          'group transition duration-75',
          'h-6 w-11 flex-none border-2',
          'cursor-pointer rounded-full border-transparent bg-gray-200',
          'data-focus-visible:outline-none data-focus-visible:ring-2 data-focus-visible:ring-accent-500 data-focus-visible:ring-offset-2',
          'data-selected:bg-accent-600',
        )}
        data-selected={isSelected || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
      >
        {/* toggle circle */}
        <span
          className="pointer-events-none relative inline-flex h-5 w-5 translate-x-0 transform items-center justify-center rounded-full bg-white shadow transition duration-150 group-data-selected:translate-x-5"
          aria-hidden="true"
        >
          {/* cross icon */}
          <svg
            className="absolute h-3 w-3 text-gray-400 opacity-100 transition duration-150 group-data-selected:opacity-0"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" />
          </svg>
          {/* check icon */}
          <svg
            className="absolute h-3 w-3 text-accent-600 opacity-0 transition duration-150 group-data-selected:opacity-100"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>

      <span className="ml-3 text-sm">{props.children}</span>
    </label>
  );
}
