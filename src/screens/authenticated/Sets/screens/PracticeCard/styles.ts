import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.ice};
  padding-right: 20px;
  padding-left: 20px;
  padding-top: ${RFPercentage(10)}px;
`;

export const ProgressBar = styled.View`
  border-radius: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_light};
  height: 20px;
  margin-bottom: ${RFPercentage(6)}px;
`;

type PercentageProps = {
  percentage: number;
};

export const Progress = styled.View<PercentageProps>`
  border-radius: 100px;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 20px;
`;

type CardProps = {
  type: 'front' | 'back';
  visible: boolean;
};

export const Card = styled(Animated.View)<CardProps>`
  background-color: ${({ theme, type }) =>
    type === 'front' ? theme.colors.white : theme.colors.primary};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 22px 24px;
  align-items: center;
  justify-content: center;
  /* min-height: ${RFPercentage(62)}px; */
  min-height: ${RFPercentage(58)}px;
  elevation: 2;
  display: ${({ visible }) => (visible === true ? 'flex' : 'none')};
`;

type ContainerProps = {
  visible: boolean;
};

export const ButtonContainer = styled.View<ContainerProps>`
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${RFPercentage(6)}px;
  display: ${({ visible }) => (visible === true ? 'flex' : 'none')};
`;

export const SkipButton = styled.TouchableOpacity``;

export const LevelContainer = styled.View<ContainerProps>`
  justify-content: center;
  align-items: center;
  margin-top: ${RFPercentage(2)}px;
  display: ${({ visible }) => (visible === true ? 'flex' : 'none')};
`;

export const LevelButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background_input};
  padding: 13px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  elevation: 2;
  width: 100%;
  align-items: center;
  border-radius: 15px;
  margin-bottom: ${RFPercentage(2)}px;
`;
