import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';

import { Container } from './styles';

interface CardLayoutProps extends ViewProps {
  children: ReactNode;
}

export function CardLayout({ children, ...rest }: CardLayoutProps) {
  return <Container {...rest}>{children}</Container>;
}
