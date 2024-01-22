import { cva, VariantProps } from 'class-variance-authority';
import { NonNullProps } from '../types.ts';
import { classNames } from '../utils.ts';

export const fieldContainerStyle = 'relative inline-flex w-64 flex-col';
export const fieldLabelStyle =
  'absolute -top-2 left-2 text-gray-900 -mt-px rounded bg-white px-1 text-xs font-medium';
export const fieldInputStyle = classNames(
  'w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 shadow-sm',
  'data-focused:border-accent-600 data-focused:ring-4 data-focused:ring-accent-200', // focused state
  'data-invalid:border-warning-600 data-invalid:ring-warning-200', // invalid state
  'data-disabled:bg-gray-50 data-disabled:text-gray-400', // disabled state
);

export const fieldHelperTextVariant = cva('relative mx-3 mt-1 inline-flex items-center text-xs', {
  variants: {
    intent: {
      description: 'font-light text-gray-900',
      error: 'font-medium text-warning-600',
    },
  },
  defaultVariants: {
    intent: 'description',
  },
});

// `VariantProps` includes `null` option which ignore all variant classes, including the default variant.
// This `null` option is removed by `NonNullProps`.
export type FieldHelperTextVariantProps = NonNullProps<VariantProps<typeof fieldHelperTextVariant>>;
