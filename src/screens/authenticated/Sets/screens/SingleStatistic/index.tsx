import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import { BarChart } from 'src/components/BarChart';
import { Text } from 'src/components/Text';
import { DataLine } from 'src/components/DataLine';

import { IRouterProps } from 'src/routes/navigation';

import { IPractice } from 'src/data/types/IPractice';
import { useFocusEffect } from '@react-navigation/native';
import { api } from 'src/services/api';
import { Container, Scroll, InformationContainer } from './styles';

export function SingleStatistic({ navigation, route }: IRouterProps) {
  const id = route.params?.id;

  const [practice, setPractice] = useState<IPractice & { time: string }>({
    amountEasy: 0,
    amountMedium: 0,
    amountHard: 0,
    time: '',
  });

  async function loadPractice() {
    try {
      const { data } = await api.get(`/practices/${id}`);
      const startTime = dayjs(data.startTime);
      const endTime = dayjs(data.endTime);

      let time = 0;
      time = endTime.diff(startTime, 'seconds');
      if (time < 60) {
        data.time = `${time} segundo(s)`;
      } else {
        data.time = `${endTime.diff(startTime, 'minutes')} minuto(s)`;
      }

      setPractice(data);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      loadPractice();
    }, []),
  );

  return (
    <Scroll>
      <Container>
        <BarChart
          data={{
            ...practice,
            total:
              practice.amountEasy + practice.amountMedium + practice.amountHard,
          }}
        />

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

          <DataLine
            type="easy"
            field="Fácil"
            label={`${practice.amountEasy} cartões`}
          />
          <DataLine
            type="medium"
            field="Mediana"
            label={`${practice.amountMedium} cartões`}
          />
          <DataLine
            type="hard"
            field="Difícil"
            label={`${practice.amountHard} cartões`}
          />
          <DataLine type="title" field="Tempo" label={`${practice.time}`} />
        </InformationContainer>
      </Container>
    </Scroll>
  );
}
