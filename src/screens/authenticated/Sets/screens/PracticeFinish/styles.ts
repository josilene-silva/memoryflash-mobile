import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Text } from 'src/components/Text';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CelebrationImage = styled.Image``;

export const ButtonContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${RFPercentage(6)}px;
`;

export const FullReview = styled(Text).attrs({
  fontFamily: 'montserrat_bold',
  color: 'primary',
  fontSize: 20,
})`
  margin-top: 50px;
`;

export const GoBack = styled(Text).attrs({
  fontFamily: 'montserrat_bold',
  color: 'primary',
})`
  margin-top: 20px;
`;

export const SkipButton = styled.TouchableOpacity``;
