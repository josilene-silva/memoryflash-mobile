import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { BarChart } from 'src/components/BarChart';
import { Text } from 'src/components/Text';
import { DataLine } from 'src/components/DataLine';

import { IRouterProps } from 'src/routes/navigation';

import { IPractice } from 'src/data/types/IPractice';

import { api } from 'src/services/api';

import { Container, Scroll, InformationContainer } from './styles';

interface IPracticeData extends IPractice {
  timesPracticed: number;
}

export function GeneralStatistics({ navigation, route }: IRouterProps) {
  const id = route.params?.id;

  const [practice, setPractice] = useState<IPracticeData>({
    amountEasy: 0,
    amountMedium: 0,
    amountHard: 0,
    timesPracticed: 0,
  });

  async function loadPractice() {
    try {
      const { data } = await api.get(`/sets/${id}`);
      const { practices } = data;

      const amount = {
        amountEasy: 0,
        amountMedium: 0,
        amountHard: 0,
      };

      practices.forEach(elem => {
        amount.amountEasy += elem.amountEasy;
        amount.amountMedium += elem.amountMedium;
        amount.amountHard += elem.amountHard;
      });

      setPractice({
        amountEasy: amount.amountEasy,
        amountMedium: amount.amountMedium,
        amountHard: amount.amountHard,
        timesPracticed: practices.length,
      });
    } catch (error) {}
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
          <DataLine
            type="title"
            field="Praticado"
            label={`${practice.timesPracticed} vez(es)`}
          />
          {/* <DataLine
            type="title"
            field="Tempo total"
            label={`${practice.totalTime} minutos`}
          /> */}
        </InformationContainer>
      </Container>
    </Scroll>
  );
}
