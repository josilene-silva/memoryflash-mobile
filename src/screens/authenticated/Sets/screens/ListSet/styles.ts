import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';

export const Container = styled.SafeAreaView``;

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ice};
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
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

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
