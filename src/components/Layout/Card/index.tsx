import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container } from './styles';

interface CardLayoutProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function CardLayout({ children, ...rest }: CardLayoutProps) {
  return <Container {...rest}>{children}</Container>;
}
