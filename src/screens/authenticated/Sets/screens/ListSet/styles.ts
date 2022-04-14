import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';

import { ICard } from '../../../../../data/types';

export const Container = styled.SafeAreaView``;

export const Scroll = styled.SafeAreaView`
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
  justify-content: flex-end;
`;

export const IconItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const CardsList = styled(
  FlatList as new (props: FlatListProps<ICard>) => FlatList<ICard>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 30,
  },
})``;

export const FloatButton = styled.View`
  bottom: 2%;
  position: absolute;
  z-index: 3;
  align-self: center;
`;
