import styled from 'styled-components/native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity``;

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

interface IconProps {
  color: string;
  size: number;
}

export const Icon = styled(Feather)<IconProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
  margin-right: 10px;
`;
