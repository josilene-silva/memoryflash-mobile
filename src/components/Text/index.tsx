import React from 'react';
import { TextProps, TextPropTypes } from 'react-native';
import { Container, ITextProps } from './styles';

type Props = TextProps & ITextProps;

export function Text({ style, color, fontFamily, fontSize, children }: Props) {
  return (
    <Container
      fontFamily={fontFamily}
      fontSize={fontSize}
      color={color}
      style={style}
    >
      {children}
    </Container>
  );
}
