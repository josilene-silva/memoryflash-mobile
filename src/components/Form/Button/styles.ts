import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  elevation: 2;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.poppins_medium};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(14)}px;
`;
