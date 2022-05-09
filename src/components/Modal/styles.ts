import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Text as TextComponent } from 'src/components/Text';
import { Button as ButtonComponent } from 'src/components/Form/Button';

export const Container = styled.Modal``;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
`;

export const Box = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 42px 20px;
  border-radius: 10px;
  align-items: center;
  width: ${RFValue(280)}px;
  min-width: 300px;
`;

export const Type = styled(TextComponent).attrs({
  fontFamily: 'montserrat_bold',
  fontSize: 20,
})`
  margin-top: 20px;
`;

export const Text = styled(TextComponent).attrs({
  color: 'text',
})`
  margin-top: 30px;
  text-align: center;
`;

export const Button = styled(ButtonComponent)`
  padding: 10px;
  margin-top: ${RFValue(40)}px;
  max-width: ${RFValue(115)}px;
`;
