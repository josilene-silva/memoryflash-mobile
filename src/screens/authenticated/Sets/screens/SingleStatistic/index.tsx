import React from 'react';

import { BarChart } from 'src/components/BarChart';
import { Text } from 'src/components/Text';
import { DataLine } from 'src/components/DataLine';

import { Container, Scroll, InformationContainer } from './styles';

export function SingleStatistic() {
  const data = {
    easy: 2,
    medium: 5,
    hard: 3,
    total: 2 + 5 + 3,
  };

  return (
    <Scroll>
      <Container>
        <BarChart data={data} />

        <InformationContainer>
          <Text
            variant={{
              fontFamily: 'montserrat_medium',
              color: 'title',
              fontSize: 18,
            }}
            style={{ marginBottom: 20 }}
          >
            Dados
          </Text>

          <DataLine type="easy" field="Fácil" label={`${data.easy} cartões`} />
          <DataLine
            type="medium"
            field="Mediana"
            label={`${data.medium} cartões`}
          />
          <DataLine
            type="hard"
            field="Difícil"
            label={`${data.hard} cartões`}
          />
          <DataLine type="title" field="Tempo" label={`${data.easy} minutos`} />
        </InformationContainer>
      </Container>
    </Scroll>
  );
}
