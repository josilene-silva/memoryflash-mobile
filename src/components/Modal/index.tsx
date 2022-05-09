import React from 'react';
import { ModalProps } from 'react-native';

import { IColors } from 'src/data/types';

import { Icon } from '../Icon';

import { Container, Type, Text, Main, Box, Button } from './styles';

interface IProps extends ModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'attention';
  message: string;
  onPress: () => void;
}

export interface IModalData {
  type: 'success' | 'error' | 'attention';
  message: string;
  isVisible: boolean;
}

const modal = {
  success: {
    icon: 'check-circle',
    color: 'medium',
    title: 'Sucesso',
  },
  attention: {
    icon: 'alert-triangle',
    color: 'attention',
    title: 'Atenção',
  },
  error: {
    icon: 'x-circle',
    color: 'hard',
    title: 'Erro',
  },
};

export function Modal({ visible, type, message, onPress, ...rest }: IProps) {
  return (
    <Container animationType="fade" transparent visible={visible} {...rest}>
      <Main>
        <Box>
          <Icon
            color={modal[type].color as IColors}
            size={58}
            name={modal[type].icon}
          />
          <Type>{modal[type].title}</Type>
          <Text>{message}</Text>
          <Button title="OK" onPress={onPress} />
        </Box>
      </Main>
    </Container>
  );
}
