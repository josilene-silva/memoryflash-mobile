/* eslint-disable no-nested-ternary */
import React from 'react';
import { ISet } from 'src/data/types';

import { CardLayout } from '../Layout/Card';

import { Category, SetInfo, SetTitle, CardsAmount, Container } from './styles';

interface Props {
  data: ISet;
  onPress: () => void;
}

export function SetsCard({ data, onPress }: Props) {
  const cardsAmount = data?.cards?.length || 0;
  return (
    <Container onPress={onPress}>
      <CardLayout style={{ marginBottom: 20 }}>
        <Category>{data?.category?.name}</Category>
        <SetInfo>
          <SetTitle>{data?.name}</SetTitle>
          <CardsAmount>
            {cardsAmount === 0
              ? 'Nenhum cartão'
              : cardsAmount > 1
              ? `${cardsAmount} cartões`
              : `${cardsAmount} cartão`}
          </CardsAmount>
        </SetInfo>
      </CardLayout>
    </Container>
  );
}
