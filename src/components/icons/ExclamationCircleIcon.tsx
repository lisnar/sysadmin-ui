import { twMerge } from 'tailwind-merge';
import { iconClassVariants } from './style.ts';
import { IconProps } from './types.ts';

export function ExclamationCircleIcon({ className, size, ...props }: IconProps) {
  return (
    // SVG taken from https://heroicons.com
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={twMerge(iconClassVariants({ size, className }))}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
