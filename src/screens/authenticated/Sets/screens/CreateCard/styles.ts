import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView``;

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Form = styled.View`
  margin-top: ${RFPercentage(7)}px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Fields = styled.View`
  margin-bottom: ${RFPercentage(14)}px;
`;
