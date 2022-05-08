import React from 'react';
/* eslint-disable no-nested-ternary */
import { CardLayout } from 'src/components/Layout/Card';
import { useTheme } from 'styled-components';

import { ICard } from 'src/data/types';

import {
  IconContainer,
  Icon,
  IconItem,
  Container,
  Front,
  Back,
} from './styles';

interface Props {
  data: ICard;
}

export function CardsCard({ data }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <CardLayout style={{ marginBottom: 20 }}>
        <Front>{data.front}</Front>
        <Back>{data.back}</Back>
        <IconContainer>
          <IconItem>
            <Icon color={theme.colors.gray_medium} size={24} name="trash" />
          </IconItem>
          <IconItem>
            <Icon color={theme.colors.text_dark} size={24} name="edit-3" />
          </IconItem>
        </IconContainer>
      </CardLayout>
    </Container>
  );
}
