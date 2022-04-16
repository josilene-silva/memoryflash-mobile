import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { ISet } from 'src/data/types';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ice};
  padding-left: 20px;
  padding-right: 20px;
`;

export const Header = styled.View`
  margin-bottom: ${RFPercentage(7)}px;
  height: ${RFValue(85)}px;
  justify-content: flex-end;
`;

export const SetsList = styled(
  FlatList as new (props: FlatListProps<ISet>) => FlatList<ISet>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 10,
  },
})``;

export const FloatButton = styled.View`
  position: absolute;
  bottom: 2%;
  z-index: 1;
  align-self: center;
`;
