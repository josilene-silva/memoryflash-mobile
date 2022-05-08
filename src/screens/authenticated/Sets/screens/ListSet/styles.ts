import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';

import { ICard } from 'src/data/types';
import { Text } from 'src/components/Text';

export const Container = styled.View`
  flex: 1;
`;

export const Scroll = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ice};
  padding-right: 20px;
  padding-left: 20px;
`;

export const Category = styled(Text).attrs({
  variant: 'smallPrimaryPoppinsBold',
})`
  margin-bottom: 10px;
`;

export const About = styled(Text).attrs({
  fontFamily: 'montserrat_bold',
})``;

export const Description = styled(Text)`
  margin-top: 11px;
`;

export const AddCard = styled(Text).attrs({
  fontFamily: 'montserrat_bold',
  color: 'primary',
})``;

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
  margin-top: 20px;
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
    paddingBottom: 50,
  },
})``;

export const FloatButton = styled.View`
  bottom: 2%;
  position: absolute;
  z-index: 3;
  align-self: center;
`;
