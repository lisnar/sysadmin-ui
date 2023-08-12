import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { classNames } from '~/utils/classnames.ts';

// Use ComponentProps instead of HTMLProps or HTMLAttributes.
// https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/patterns_by_usecase.md#componentprops
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, isLoading } = props;

  return (
    <button className={classNames('relative', className)} ref={ref}>
      {isLoading && <ButtonSpinner />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </button>
  );
});

// Required by eslint rule (react/display-name).
// The button component was missing display name because it's an anonymous function `(props, ref) => ...`.
Button.displayName = 'Button';

function ButtonSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
    </div>
  );
}
