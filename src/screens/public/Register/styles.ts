import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { Text } from 'src/components/Text';

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

export const Title = styled(Text).attrs({
  variant: 'titlePrimaryMontserratBold',
})`
  text-align: center;
`;

export const Subtitle = styled(Text).attrs({
  variant: 'smallTextPoppinsRegular',
})`
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

export const Question = styled(Text).attrs({
  variant: 'smallTextPoppinsRegular',
})``;

export const Action = styled.TouchableOpacity``;

export const ActionText = styled(Text).attrs({
  variant: 'smallPrimaryPoppinsRegular',
})``;
