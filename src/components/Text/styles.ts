import { Text } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { IColors, IFontFamily } from 'src/data/types';
import { IVariant, variant } from 'src/utils/variants';

export interface ITextProps {
  color?: IColors;
  fontFamily?: IFontFamily;
  fontSize?: number;
  variant?: IVariant;
}

function calculateFontSize(value: number): number {
  return RFValue(value - 3);
}

export const Container = styled(Text).attrs<ITextProps>(
  props => props.variant && variant[props.variant],
)<ITextProps>`
  color: ${({ theme, color = 'text_dark' }) => theme.colors[color]};
  font-size: ${({ fontSize = 16 }) => calculateFontSize(fontSize)}px;
  font-family: ${({ theme, fontFamily = 'poppins_regular' }) =>
    theme.fonts[fontFamily]};
`;
