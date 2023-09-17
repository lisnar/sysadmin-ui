import { twMerge } from 'tailwind-merge';
import { iconClassVariants } from './style.ts';
import { IconProps } from './types.ts';

export function CheckIcon({ className, size, ...props }: IconProps) {
  return (
    // SVG taken from https://www.tailwindtap.com/resources/icons
    <svg
      {...props}
      className={twMerge(iconClassVariants({ size, className }))}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}
