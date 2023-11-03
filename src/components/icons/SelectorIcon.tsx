import { twMerge } from 'tailwind-merge';
import { iconClassVariants } from './style.ts';
import { IconProps } from './types.ts';

export function SelectorIcon({ className, size, ...props }: IconProps) {
  return (
    // SVG taken from https://www.tailwindtap.com/resources/icons
    <svg
      {...props}
      className={twMerge(iconClassVariants({ size, className }))}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
}
