import { forwardRef, useRef } from 'react';
import { AriaTextFieldProps, mergeProps, useFocusRing, useTextField } from 'react-aria';
import { ExclamationCircleIcon } from '../../icons';
import { mergeRefs } from '../../utils.ts';
import {
  fieldContainerStyle,
  fieldHelperTextVariant,
  fieldInputStyle,
  fieldLabelStyle,
} from '../style.ts';

export const TextField = forwardRef<HTMLInputElement, AriaTextFieldProps>((props, forwardedRef) => {
  const ref = useRef<HTMLInputElement>(null);

  const { inputProps, labelProps, descriptionProps, errorMessageProps } = useTextField(props, ref);
  const { focusProps, isFocused } = useFocusRing(props);

  const { label, description, errorMessage, isDisabled } = props;
  const isInvalid = !!errorMessage && !isDisabled;

  return (
    <div className={fieldContainerStyle}>
      <label {...labelProps} className={fieldLabelStyle}>
        {label}
      </label>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={mergeRefs(ref, forwardedRef)}
        className={fieldInputStyle}
        // The value of `data-...` attributes will be 'true' or undefined. This will simplify usage of CSS selectors.
        data-focused={isFocused || undefined}
        data-invalid={isInvalid || undefined}
        data-disabled={isDisabled! || undefined}
      />
      {isInvalid && (
        <small {...errorMessageProps} className={fieldHelperTextVariant({ intent: 'error' })}>
          <ExclamationCircleIcon size="xs" className="mr-0.5" aria-hidden="true" />
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
