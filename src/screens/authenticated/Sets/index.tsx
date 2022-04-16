import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { RoundButton } from 'src/components/RoundButton';
import { SetsCard } from 'src/components/SetsCard';
import { Text } from 'src/components/Text';

import { IRouterProps } from 'src/routes/navigation';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { Container, Header, SetsList, FloatButton } from './styles';

export function Sets({ navigation }: IRouterProps) {
  const [sets, setSets] = useState<ISet[]>([]);

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
        <Text
          variant={{
            fontFamily: 'montserrat_bold',
            fontSize: 20,
            color: 'primary',
          }}
        >
          Conjunto de cartões
        </Text>
      </Header>

      <SetsList
        data={sets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SetsCard
            data={item}
            onPress={() =>
              navigation.navigate('ListSet', { name: item.name, id: item.id })
            }
          />
        )}
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
