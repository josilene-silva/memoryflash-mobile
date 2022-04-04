import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { DataListProps } from '.';

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

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.montserrat_bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SetsList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>,
  ) => FlatList<DataListProps>,
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
