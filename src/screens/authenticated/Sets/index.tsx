import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { RoundButton } from '../../../components/RoundButton';

import { SetsCard } from '../../../components/SetsCard';
import { IRouterProps } from '../../../routes/navigation';
import { api } from '../../../services/api';
import { Container, Header, Title, SetsList, FloatButton } from './styles';

export interface ICategory {
  name: string;
}

export interface ICard {
  id: string;
  name: string;
}
export interface DataListProps {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  cards: ICard[];
}

export function Sets({ navigation }: IRouterProps) {
  const [sets, setSets] = useState<DataListProps[]>([]);

  async function loadSets() {
    try {
      const { data } = await api.get('/sets');
      setSets(data);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      loadSets();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Title>Conjunto de cartões</Title>
      </Header>

      <SetsList
        data={sets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SetsCard data={item} />}
      />

      <FloatButton>
        <RoundButton
          title="Novo conjunto"
          onPress={() => navigation.navigate('CreateSets')}
        />
      </FloatButton>
    </Container>
  );
}
