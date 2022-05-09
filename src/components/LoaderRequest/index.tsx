import React from 'react';
import { ActivityIndicator, ModalProps } from 'react-native';

import { Container, Information, Main } from './styles';

interface IProps extends ModalProps {
  visible: boolean;
  info?: string;
}

export function LoaderRequest({ visible, info, ...rest }: IProps) {
  return (
    <Container animationType="fade" transparent visible={visible} {...rest}>
      <Main>
        <ActivityIndicator size="large" color="#5E60CE" />
        {info && <Information>{info}</Information>}
      </Main>
    </Container>
  );
}
