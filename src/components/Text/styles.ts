import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { IVariant, variant } from 'src/utils/variants';
import styled from 'styled-components/native';

export interface ITextProps {
  color?:
    | 'primary'
    | 'white'
    | 'ice'
    | 'background_input'
    | 'gray_light'
    | 'gray_medium'
    | 'title'
    | 'text'
    | 'text_dark'
    | 'easy'
    | 'hard'
    | 'medium';
  fontFamily?:
    | 'montserrat_regular'
    | 'montserrat_medium'
    | 'montserrat_bold'
    | 'poppins_regular'
    | 'poppins_medium'
    | 'poppins_bold';
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
