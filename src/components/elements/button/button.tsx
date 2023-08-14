import { forwardRef, useRef } from 'react';
import { mergeProps, useButton, useFocusRing, useHover, type AriaButtonProps } from 'react-aria';
import { Spinner } from '../spinner';
import { classNames, mergeRefs } from '../utils.ts';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  isLoading?: boolean;
}

// 13-min video: Reusable button with React ARIA and Tailwind
// https://youtu.be/d4WvtFEndnc

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const { children, className, isLoading } = props;
  const internalRef = useRef(null);

  const { buttonProps, isPressed } = useButton(props, internalRef);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);

  return (
    <button
      ref={mergeRefs(internalRef, forwardedRef)}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={classNames('relative inline-flex items-center justify-center', className)}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      {isLoading && <Spinner className="absolute h-5 w-5" />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </button>
  );
});

// Required by eslint rule (react/display-name).
// The button component was missing display name because it's an anonymous function `(props, ref) => ...`.
Button.displayName = 'Button';
