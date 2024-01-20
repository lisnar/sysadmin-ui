import { twMerge } from 'tailwind-merge';
import { iconClassVariants } from './style.ts';
import { IconProps } from './types.ts';

export function CheckIcon({ className, size, ...props }: IconProps) {
  return (
    // SVG taken from https://www.tailwindtap.com/resources/icons
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(iconClassVariants({ size, className }))}
      {...props}
    >
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}
