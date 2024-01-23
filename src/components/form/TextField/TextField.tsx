import React from 'react';
import { AriaTextFieldProps, mergeProps, useFocusRing, useTextField } from 'react-aria';
import { ExclamationCircleIcon } from '../../icons';
import { mergeRefs } from '../../utils.ts';
import {
  fieldContainerStyle,
  fieldHelperTextVariant,
  fieldInputStyle,
  fieldLabelStyle,
} from '../style.ts';

export const TextField = React.forwardRef(function TextField(
  props: AriaTextFieldProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const ref = React.useRef<HTMLInputElement>(null);

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
