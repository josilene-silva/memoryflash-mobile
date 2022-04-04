import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  padding: 15px 41px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  align-self: center;
  min-width: 204px;
  elevation: 2;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.poppins_medium};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
