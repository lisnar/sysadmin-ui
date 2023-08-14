// 13-min video: Design system with Tailwind
// https://youtu.be/T-Zv73yZ_QI

import { cva, type VariantProps } from 'class-variance-authority';

// Enable class sorting: add "cva" to `tailwindFunctions` in `.prettierrc`.
// Enable IntelliSense: https://cva.style/docs/getting-started/installation#intellisense
export const buttonClassVariant = cva(
  [
    // 'relative inline-flex items-center justify-center', // behavior
    'rounded-md border px-3 py-2 shadow-sm', // appearance
    'outline-none ring-indigo-500 ring-offset-2', // outline
    'text-sm font-medium leading-4 tracking-tight', // content
    'transition focus:ring-2 enabled:hover:shadow enabled:active:scale-[0.99] enabled:active:shadow-sm', // interaction
    'disabled:cursor-not-allowed disabled:shadow-none', // disabled
  ],
  {
    variants: {
      color: {
        primary: [
          'border-transparent bg-indigo-600 text-white',
          'enabled:hover:bg-indigo-700 disabled:bg-indigo-600/50',
        ],
        secondary: [
          'border-transparent bg-indigo-100 text-indigo-700',
          'enabled:hover:bg-indigo-200 disabled:bg-indigo-100/50 disabled:text-indigo-700/50',
        ],
        plain: [
          'border-gray-300 bg-white text-gray-700',
          'enabled:hover:bg-gray-50 disabled:border-gray-300/50 disabled:text-gray-700/50',
        ],
        danger: [
          'border-transparent bg-red-600 text-white ring-red-500',
          'enabled:hover:bg-red-700 disabled:bg-red-600/50',
        ],
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonClassVariant>;
