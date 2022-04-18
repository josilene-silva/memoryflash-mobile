import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { SetsCard } from 'src/components/SetsCard';
import { Text } from 'src/components/Text';

import { IRouterProps } from 'src/routes/navigation';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { Container, Header, SetsList } from './styles';

export function Statistics({ navigation }: IRouterProps) {
  const [sets, setSets] = useState<ISet[]>([]);

  async function loadSets() {
    try {
      const response = await api.get('/sets');
      const dataSets: ISet[] = response.data;

      const dataFormatted = dataSets.filter(set => set.practices.length > 0);

      setSets(dataFormatted);
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
        <Text
          variant={{
            fontFamily: 'montserrat_bold',
            fontSize: 20,
            color: 'primary',
          }}
        >
          Estatísticas
        </Text>
      </Header>

      <SetsList
        data={sets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SetsCard
            data={item}
            onPress={() =>
              navigation.navigate('GeneralStatistics', {
                name: item.name,
                id: item.id,
              })
            }
          />
        )}
      />
    </Container>
  );
}
