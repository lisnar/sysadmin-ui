import { cva, VariantProps } from 'class-variance-authority';
import { NonNullProps } from '../types.ts';
import { classNames } from '../utils.ts';

export const fieldContainerStyle = 'relative flex w-64 flex-col text-gray-900';
export const labelStyle = 'absolute -top-2 left-2 -mt-px rounded bg-white px-1 text-xs font-medium';
export const inputStyle = classNames(
  'rounded-md px-3 py-2 text-sm shadow-sm transition duration-75',
  'border-gray-300 bg-white placeholder-gray-400', // base color
  'data-[focused]:border-indigo-600 data-[focused]:ring-4 data-[focused]:ring-indigo-200', // data-[focused] ring
  'data-[invalid]:border-red-600 data-[focused]:data-[invalid]:ring-red-200', // invalid state
  'disabled:bg-gray-50', // disabled state
);

export const fieldHelperTextVariant = cva('relative ml-3 mt-1 inline-flex items-center text-xs', {
  variants: {
    intent: {
      description: 'font-light',
      error: 'font-medium text-red-600',
    },
  },
  defaultVariants: {
    intent: 'description',
  },
});

// `VariantProps` includes `null` option which ignore all variant classes, including the default variant.
// This `null` option is removed by `NonNullProps`.
export type FieldHelperTextVariantProps = NonNullProps<VariantProps<typeof fieldHelperTextVariant>>;
