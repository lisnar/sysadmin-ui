import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Spinner } from '~/components/elements/spinner';
import { classNames } from '~/utils/classnames.ts';

// Use ComponentProps instead of HTMLProps or HTMLAttributes.
// https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/patterns_by_usecase.md#componentprops
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, isLoading } = props;

  return (
    <button
      ref={ref}
      className={classNames('relative flex items-center justify-center', className)}
    >
      {isLoading && <Spinner className="absolute h-5 w-5" />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </button>
  );
});

// Required by eslint rule (react/display-name).
// The button component was missing display name because it's an anonymous function `(props, ref) => ...`.
Button.displayName = 'Button';
