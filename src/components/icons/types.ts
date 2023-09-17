import { ComponentProps } from 'react';
import { IconVariantProps } from './style.ts';

export interface IconProps extends ComponentProps<'svg'>, IconVariantProps {
  className?: string;
}
