import React from 'react';
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import { mergeRefs } from '../../utils.ts';

export interface ButtonBaseProps extends AriaButtonProps {
  className?: string;
}

export const ButtonBase = React.forwardRef(function ButtonBase(
  { children, className, ...props }: ButtonBaseProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      ref={mergeRefs(ref, forwardedRef)}
      className={className}
      // The value of `data-...` attributes will be 'true' or undefined. This will simplify usage of CSS selectors.
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-disabled={props.isDisabled! || undefined}
    >
      {children}
    </button>
  );
});
