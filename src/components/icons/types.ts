import React from 'react';
import { IconVariantProps } from './style.ts';

export interface IconProps extends React.ComponentProps<'svg'>, IconVariantProps {
  className?: string;
}
