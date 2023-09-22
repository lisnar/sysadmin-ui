import { twMerge } from 'tailwind-merge';
import { Spinner } from '../../icons';
import { classNames } from '../utils.ts';
import { HeadlessButton, HeadlessButtonProps } from './HeadlessButton.tsx';
import { ButtonVariantProps, buttonClassVariants } from './style.ts';

// Use `interface` here because it will generate error when extended types have conflicting properties.
// If `type` is used, conflicting properties will quietly overwrite each other.
export interface ButtonProps extends HeadlessButtonProps, ButtonVariantProps {
  isLoading?: boolean;
}

export function Button({ children, className, intent, isLoading }: ButtonProps) {
  return (
    <HeadlessButton className={twMerge(buttonClassVariants({ intent, className }))}>
      {isLoading && <Spinner size="sm" className="absolute" />}
      <span className={classNames('transition', isLoading && 'opacity-0')}>{children}</span>
    </HeadlessButton>
  );
}
