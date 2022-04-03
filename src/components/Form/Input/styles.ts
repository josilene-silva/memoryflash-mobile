import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 25px;
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.poppins_regular};
  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.background_input};
  border-radius: 8px;
`;
