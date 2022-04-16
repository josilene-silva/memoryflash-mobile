import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;

interface IBarProps {
  type: 'easy' | 'medium' | 'hard';
  percentage: number;
}

export const BarContainer = styled.View`
  margin-top: ${RFPercentage(7)}px;
  flex-direction: row;
  justify-content: space-evenly;
  height: ${RFPercentage(50)}px;
  align-items: flex-end;
`;

export const Bar = styled.View<IBarProps>`
  background-color: ${({ theme, type }) => theme.colors[type]};
  width: 50px;
  height: ${({ percentage }) => percentage}%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Line = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_light};
  height: 5px;
  border-radius: 10px;
`;
