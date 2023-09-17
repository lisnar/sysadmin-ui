import { twMerge } from 'tailwind-merge';
import { iconClassVariants } from './style.ts';
import { IconProps } from './types.ts';

export function ErrorIcon({ className, size, ...props }: IconProps) {
  return (
    // SVG taken from https://www.tailwindtap.com/resources/icons
    <svg
      {...props}
      className={twMerge(iconClassVariants({ size, className }))}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
