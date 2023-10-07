import { forwardRef, useRef } from 'react';
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import { mergeRefs } from '../utils.ts';

export interface HeadlessButtonProps extends AriaButtonProps {
  className?: string;
}

export const HeadlessButton = forwardRef<HTMLButtonElement, HeadlessButtonProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const ref = useRef<HTMLButtonElement>(null);

    const { buttonProps, isPressed } = useButton(props, ref);
    const { hoverProps, isHovered } = useHover(props);
    const { focusProps, isFocusVisible } = useFocusRing(props);

    return (
      <button
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={mergeRefs(ref, forwardedRef)}
        className={className}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
      >
        {children}
      </button>
    );
  },
);

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
HeadlessButton.displayName = 'HeadlessButton';
