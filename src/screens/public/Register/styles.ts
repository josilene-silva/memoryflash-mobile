import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.View`
  margin-bottom: ${RFPercentage(7)}px;
  height: ${RFValue(190)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.montserrat_bold};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.poppins_regular};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 13px;
`;

export const Form = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

export const Fields = styled.View`
  margin-bottom: ${RFPercentage(7)}px;
`;

export const AccountAction = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin-top: ${RFPercentage(8)}px;
  margin-bottom: ${RFPercentage(2)}px;
`;
export const Question = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.poppins_regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Action = styled.TouchableOpacity``;

export const ActionText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.poppins_regular};
  color: ${({ theme }) => theme.colors.primary};
`;
