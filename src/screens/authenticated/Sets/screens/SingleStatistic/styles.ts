import { RFPercentage } from 'react-native-responsive-fontsize';
import { Text } from 'src/components/Text';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const Scroll = styled.ScrollView`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const InformationContainer = styled.View`
  margin-top: ${RFPercentage(7)}px;
`;

export const Data = styled(Text).attrs({
  fontFamily: 'montserrat_medium',
  color: 'title',
  fontSize: 18,
})`
  margin-bottom: 20px;
`;
