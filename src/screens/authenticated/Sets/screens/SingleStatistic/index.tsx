import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

import { BarChart } from 'src/components/BarChart';
import { DataLine } from 'src/components/DataLine';

import { IRouterProps } from 'src/routes/navigation';
import { IPractice } from 'src/data/types/IPractice';

import { api } from 'src/services/api';

import { Container, Scroll, InformationContainer, Data } from './styles';

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

  function configureAgreement(value: number): string {
    if (value === 1) {
      return `${value} cartão`;
    }
    return `${value} cartões`;
  }

  useFocusEffect(
    useCallback(() => {
      loadPractice();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params?.name });
  }, [navigation, route]);

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
          <Data>Dados</Data>

          <DataLine
            type="easy"
            field="Fácil"
            label={configureAgreement(practice.amountEasy)}
          />
          <DataLine
            type="medium"
            field="Mediana"
            label={configureAgreement(practice.amountMedium)}
          />
          <DataLine
            type="hard"
            field="Difícil"
            label={configureAgreement(practice.amountHard)}
          />
          <DataLine type="title" field="Tempo" label={`${practice.time}`} />
        </InformationContainer>
      </Container>
    </Scroll>
  );
}
