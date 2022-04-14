import React from 'react';
import { TextProps } from 'react-native';
import { Container, ITextProps } from './styles';

type Props = TextProps & {
  variant: ITextProps;
};

export function Text({ style, variant, children }: Props) {
  return (
    <Container
      fontFamily={variant.fontFamily}
      fontSize={variant.fontSize}
      color={variant.color}
      style={style}
    >
      {children}
    </Container>
  );
}
