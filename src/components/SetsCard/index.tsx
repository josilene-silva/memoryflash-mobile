import React from 'react';

import { DataListProps } from '../../screens/authenticated/Sets';
import { CardLayout } from '../Layout/Card';

import { Category, SetInfo, SetTitle, CardsAmount } from './styles';

interface Props {
  data: DataListProps;
  onPress: () => void;
}

export function SetsCard({ data, onPress }: Props) {
  const cardsAmount = data.cards.length;
  return (
    <CardLayout style={{ marginBottom: 20 }} onPress={onPress}>
      <Category>{data.category.name}</Category>
      <SetInfo>
        <SetTitle>{data.name}</SetTitle>
        <CardsAmount>
          {cardsAmount === 0
            ? 'Nenhum cartão'
            : cardsAmount > 1
            ? `${cardsAmount} cartões`
            : `${cardsAmount} cartão`}
        </CardsAmount>
      </SetInfo>
    </CardLayout>
  );
}
