import { cva, VariantProps } from 'class-variance-authority';
import { NonNullProps } from '../types.ts';

export const iconClassVariants = cva('', {
  variants: {
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-14 w-14',
      xl: 'h-24 w-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// `VariantProps` includes `null` option which ignore all variant classes, including the default variant.
// This `null` option is removed by `NonNullProps`.
export type IconVariantProps = NonNullProps<VariantProps<typeof iconClassVariants>>;
