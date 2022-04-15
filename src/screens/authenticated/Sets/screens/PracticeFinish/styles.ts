import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const SkipButton = styled.TouchableOpacity``;
