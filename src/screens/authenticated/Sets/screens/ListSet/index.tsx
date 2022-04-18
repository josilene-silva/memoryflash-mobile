import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { IRouterProps } from 'src/routes/navigation';
import { RoundButton } from 'src/components/RoundButton';
import { Text } from 'src/components/Text';
import { CardLayout } from 'src/components/Layout/Card';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';
import { CardsCard } from 'src/components/CardsCard';

import {
  Container,
  Scroll,
  Icon,
  IconContainer,
  IconItem,
  CardsList,
  FloatButton,
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
          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
              fontSize: 10,
            }}
            style={{ marginBottom: 10 }}
          >
            {set.category.name}
          </Text>

          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'text_dark',
            }}
          >
            Sobre
          </Text>
          <Text
            variant={{
              fontFamily: 'poppins_regular',
              color: 'text_dark',
            }}
            style={{ marginTop: 11 }}
          >
            {set.description}
          </Text>
        </CardLayout>

        <IconItem
          style={{ marginVertical: 29 }}
          onPress={() => navigation.navigate('CreateCard', { setId: set.id })}
        >
          <Icon color={theme.colors.primary} size={32} name="plus" />
          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
            }}
          >
            Adicionar cartão
          </Text>
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
