import { forwardRef, useRef } from 'react';
import { AriaTextFieldProps, mergeProps, useFocusRing, useTextField } from 'react-aria';
import { MdError } from 'react-icons/md';
import { mergeRefs } from '../utils.ts';
import { fieldContainerStyle, fieldHelperTextVariant, inputStyle, labelStyle } from './style.ts';

export const TextField = forwardRef<HTMLInputElement, AriaTextFieldProps>((props, forwardedRef) => {
  const { label, description, errorMessage, isDisabled } = props;
  const ref = useRef<HTMLInputElement>(null);

  const { inputProps, labelProps, descriptionProps, errorMessageProps } = useTextField(props, ref);
  const { focusProps, isFocused } = useFocusRing(props);
  const isInvalid = !!errorMessage && !isDisabled;

  return (
    <div className={fieldContainerStyle}>
      <label {...labelProps} className={labelStyle}>
        {label}
      </label>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={mergeRefs(ref, forwardedRef)}
        className={inputStyle}
        data-focused={isFocused || undefined}
        data-invalid={isInvalid || undefined}
      />
      {isInvalid && (
        <small {...errorMessageProps} className={fieldHelperTextVariant({ intent: 'error' })}>
          <MdError className="mr-0.5 h-4 w-4" aria-hidden="true" />
          {errorMessage}
        </small>
      )}
      {description && (
        <small {...descriptionProps} className={fieldHelperTextVariant({ intent: 'description' })}>
          {description}
        </small>
      )}
    </div>
  );
});

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
TextField.displayName = 'TextField';
