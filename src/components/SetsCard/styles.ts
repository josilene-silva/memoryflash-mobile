import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.poppins_bold};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SetInfo = styled.View`
  margin-top: 8px;
`;

export const SetTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.poppins_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CardsAmount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.poppins_regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text};
`;
