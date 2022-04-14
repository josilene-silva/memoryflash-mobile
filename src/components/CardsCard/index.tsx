import React from 'react';
/* eslint-disable no-nested-ternary */
import { CardLayout } from 'src/components/Layout/Card';
import { Text } from 'src/components/Text';
import { useTheme } from 'styled-components';

import { ICard } from 'src/data/types';

import { IconContainer, Icon, IconItem } from './styles';

interface Props {
  data: ICard;
  onPress: () => void;
}

export function CardsCard({ data, onPress }: Props) {
  const theme = useTheme();

  return (
    <CardLayout style={{ marginBottom: 20 }} onPress={onPress}>
      <Text
        variant={{
          fontFamily: 'poppins_medium',
          color: 'text_dark',
          fontSize: 17,
        }}
        style={{ marginTop: 11 }}
      >
        {data.front}
      </Text>
      <Text
        variant={{
          fontFamily: 'poppins_regular',
          color: 'text_dark',
        }}
      >
        {data.back}
      </Text>
      <IconContainer>
        <IconItem>
          <Icon color={theme.colors.gray_medium} size={24} name="trash" />
        </IconItem>
        <IconItem>
          <Icon color={theme.colors.text_dark} size={24} name="edit-3" />
        </IconItem>
      </IconContainer>
    </CardLayout>
  );
}
