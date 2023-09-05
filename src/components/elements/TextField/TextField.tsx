import { forwardRef, useRef } from 'react';
import { AriaTextFieldProps, mergeProps, useFocusRing, useTextField } from 'react-aria';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { classNames, mergeRefs } from '../utils.ts';

export const TextField = forwardRef<HTMLInputElement, AriaTextFieldProps>((props, forwardedRef) => {
  const { label, description, errorMessage, isDisabled = false } = props;
  const ref = useRef<HTMLInputElement>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);
  const { focusProps, isFocused } = useFocusRing(props);
  const isInvalid = !!errorMessage && !isDisabled;

  return (
    <div className="relative flex w-64 flex-col text-gray-900">
      <label
        {...labelProps}
        className="absolute -top-2 left-2 -mt-px rounded bg-white px-1 text-xs font-medium"
      >
        {label}
      </label>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={mergeRefs(ref, forwardedRef)}
        className={classNames(
          'rounded-md px-3 py-2 text-sm shadow-sm transition',
          'border-gray-300 bg-white placeholder-gray-400', // base color
          'data-[focused]:border-indigo-600 data-[focused]:ring-indigo-600', // focus ring
          'data-[invalid]:border-red-600 data-[focused]:data-[invalid]:ring-red-600', // invalid state
          'disabled:bg-gray-50', // disabled state
        )}
        data-focused={isFocused || undefined}
        data-invalid={isInvalid || undefined}
      />
      {isInvalid && (
        <small
          {...errorMessageProps}
          className="relative ml-3 mt-1 flex items-center text-xs text-red-600"
        >
          <BsExclamationCircleFill
            className="pointer-events-none mr-1 h-3 w-3"
            aria-hidden="true"
          />
          {errorMessage}
        </small>
      )}
      {description && (
        <small {...descriptionProps} className="ml-3 mt-1 text-xs">
          {description}
        </small>
      )}
    </div>
  );
});

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// The display name was missing because it's an anonymous function `(props, ref) => ...`.
TextField.displayName = 'TextField';
