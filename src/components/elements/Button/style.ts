import { cva, VariantProps } from 'class-variance-authority';
import { NonNullProps } from '../../types.ts';

// Enable class sorting: add "cva" to `tailwindFunctions` in `.prettierrc`.
// Enable IntelliSense: https://cva.style/docs/getting-started/installation#intellisense
export const buttonVariant = cva(
  [
    'relative transition duration-75', // behavior
    'inline-flex items-center justify-center border px-3 py-2', // layout
    'rounded-md border-transparent shadow-sm outline-none ring-accent-500 ring-offset-2', // appearance
    'text-sm font-medium leading-4 tracking-tight', // content
    'data-focus-visible:ring-2 data-hovered:shadow', // focused & hovered state
    'data-pressed:scale-[0.99] data-pressed:shadow-sm', // pressed state
    'data-disabled:cursor-not-allowed', // disabled state
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-accent-600 text-white',
          'data-hovered:bg-accent-700',
          'data-disabled:bg-accent-600/50',
        ],
        // primary: [
        //   'bg-accent-100 text-accent-700',
        //   'data-hovered:bg-accent-200',
        //   'data-disabled:bg-accent-100/50 data-disabled:text-accent-700/50',
        // ],
        neutral: [
          'border-gray-300 bg-white text-gray-700',
          'data-hovered:bg-gray-50',
          'data-disabled:border-gray-300/50 data-disabled:text-gray-700/50',
        ],
        destructive: [
          'bg-warning-600 text-white ring-warning-500',
          'data-hovered:bg-warning-700',
          'data-disabled:bg-warning-600/50',
        ],
      },
    },
    defaultVariants: {
      intent: 'neutral',
    },
  },
);

// `VariantProps` includes `null` option which ignore all variant classes, including the default variant.
// This `null` option is removed by `NonNullProps`.
export type ButtonVariantProps = NonNullProps<VariantProps<typeof buttonVariant>>;
