import styled from 'styled-components/native';

import { Text } from '../Text';

export const Container = styled.TouchableOpacity``;

export const Category = styled(Text).attrs({
  variant: 'smallPrimaryPoppinsBold',
})``;

export const SetInfo = styled.View`
  margin-top: 8px;
`;

export const SetTitle = styled(Text).attrs({
  variant: 'mediumTitlePoppinsMedium',
})``;

export const CardsAmount = styled(Text).attrs({
  color: 'text',
})``;
