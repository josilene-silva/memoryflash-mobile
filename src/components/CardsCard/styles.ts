import styled from 'styled-components/native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { Text } from '../Text';

export const Container = styled.View``;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const IconItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const Front = styled(Text).attrs({
  fontFamily: 'poppins_medium',
  color: 'text_dark',
  fontSize: 20,
})`
  margin-top: 11px;
`;

export const Back = styled(Text)``;

interface IconProps {
  color: string;
  size: number;
}

export const Icon = styled(Feather)<IconProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
  margin-right: 10px;
`;
