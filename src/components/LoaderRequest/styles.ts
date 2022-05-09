import styled from 'styled-components/native';
import { Text } from '../Text';

export const Container = styled.Modal``;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
`;

export const Information = styled(Text).attrs({
  fontFamily: 'poppins_medium',
})`
  margin-top: 50px;
`;
