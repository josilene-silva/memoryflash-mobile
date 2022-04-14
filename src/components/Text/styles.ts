import { TextPropTypes, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export interface ITextProps {
  color:
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
  fontFamily:
    | 'montserrat_regular'
    | 'montserrat_medium'
    | 'montserrat_bold'
    | 'poppins_regular'
    | 'poppins_medium'
    | 'poppins_bold';
  fontSize: number;
}

export const Container = styled(Text)<ITextProps>`
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ fontSize }) => RFValue(fontSize)}px;
  font-family: ${({ theme, fontFamily }) => theme.fonts[fontFamily]};
`;
