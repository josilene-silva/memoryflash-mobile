import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { IconProps } from '.';

export const Icon = styled(Feather).attrs<IconProps>(
  props => props.name && { name: props.name },
)<IconProps>`
  color: ${({ color = 'text_dark', theme }) => theme.colors[color]};
  font-size: ${({ size = 24 }) => size}px;
`;
