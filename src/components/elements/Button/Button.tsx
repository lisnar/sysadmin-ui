import { twMerge } from 'tailwind-merge';
import { SpinnerIcon } from '../../icons';
import { classNames } from '../../utils.ts';
import { ButtonBase, ButtonBaseProps } from './ButtonBase.tsx';
import { ButtonVariantProps, buttonVariant } from './style.ts';

// Use `interface` here because it will generate error when extended types have conflicting properties.
// If `type` is used, conflicting properties will quietly overwrite each other.
export interface ButtonProps extends ButtonBaseProps, ButtonVariantProps {
  isLoading?: boolean;
}

export function Button({ children, className, intent, isLoading, ...props }: ButtonProps) {
  return (
    <ButtonBase {...props} className={twMerge(buttonVariant({ intent, className }))}>
      {isLoading && <SpinnerIcon size="sm" className="absolute" />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </ButtonBase>
  );
}
