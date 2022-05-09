import React from 'react';

import { IColors } from 'src/data/types';

import { Icon as IconComponent } from './styles';

export interface IconProps {
  color: IColors;
  size: number;
  name: string;
}

export function Icon({ color, size, name }: IconProps) {
  return <IconComponent color={color} size={size} name={name} />;
}
