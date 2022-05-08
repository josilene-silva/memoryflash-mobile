import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { IRouterProps } from 'src/routes/navigation';

import { RoundButton } from 'src/components/RoundButton';
import { CardLayout } from 'src/components/Layout/Card';
import { CardsCard } from 'src/components/CardsCard';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import {
  Container,
  Scroll,
  Icon,
  IconContainer,
  IconItem,
  CardsList,
  FloatButton,
  Category,
  About,
  Description,
  AddCard,
} from './styles';

export function ListSet({ route, navigation }: IRouterProps) {
  const { id } = route.params;

  const theme = useTheme();
  const [set, setSet] = useState<Omit<ISet, 'practices'>>({
    id: '',
    name: '',
    description: '',
    category: {
      name: '',
    },
    cards: [
      {
        id: '',
        front: '',
        back: '',
        difficultyLevel: 0,
      },
    ],
  });

  async function loadSet() {
    try {
      const { data } = await api.get(`/sets/${id}`);
      setSet(data);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      loadSet();
    }, []),
  );

  return (
    <Scroll>
      <Container>
        <IconContainer>
          <IconItem>
            <Icon color={theme.colors.gray_medium} size={24} name="trash" />
          </IconItem>

          <IconItem>
            <Icon color={theme.colors.text_dark} size={24} name="edit-3" />
          </IconItem>
        </IconContainer>

        <CardLayout style={{ marginTop: 30 }}>
          <Category>{set.category.name}</Category>

          <About>Sobre</About>
          <Description>{set.description}</Description>
        </CardLayout>

        <IconItem
          style={{ marginVertical: 29 }}
          onPress={() => navigation.navigate('CreateCard', { setId: set.id })}
        >
          <Icon color={theme.colors.primary} size={32} name="plus" />
          <AddCard>Adicionar cartão</AddCard>
        </IconItem>

        <CardsList
          data={set.cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardsCard data={item} />}
        />
      </Container>
      <FloatButton>
        <RoundButton
          title="Iniciar prática"
          onPress={() => {
            if (set.cards.length > 2) {
              navigation.navigate('PracticeCard', { id: set.id });
            } else {
              Alert.alert('Atenção', 'Você não possui cartões suficiente!');
            }
          }}
        />
      </FloatButton>
    </Scroll>
  );
}
