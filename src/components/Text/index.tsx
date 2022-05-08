import React from 'react';
import { TextProps } from 'react-native';
import { Container, ITextProps } from './styles';

export type Props = TextProps & ITextProps;

export function Text({
  children,
  fontFamily,
  fontSize,
  color,
  ...rest
}: Props) {
  return (
    <Container
      fontFamily={fontFamily}
      fontSize={fontSize}
      color={color}
      {...rest}
    >
      {children}
    </Container>
  );
}
