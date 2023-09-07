import { forwardRef, useRef } from 'react';
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import { Spinner } from '../Spinner';
import { classNames, mergeRefs } from '../utils.ts';
import { ButtonVariantProps, buttonVariant } from './style.ts';

// Use `interface` here because it will generate error when extended types have conflicting properties.
// If `type` is used, conflicting properties will quietly overwrite each other.
interface ButtonProps extends AriaButtonProps, ButtonVariantProps {
  className?: string;
  isLoading?: boolean;
}

// 13-min video: Reusable button with React ARIA and Tailwind
// https://youtu.be/d4WvtFEndnc

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const { children, className, intent, isLoading } = props;
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing(props);

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      ref={mergeRefs(ref, forwardedRef)}
      className={buttonVariant({ intent, className })}
      data-pressed={isPressed || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      {isLoading && <Spinner className="absolute h-5 w-5" />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </button>
  );
});

// Required by eslint rule (react/display-name).
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
// Display name was missing because the component is an anonymous function `(props, ref) => ...`.
Button.displayName = 'Button';
