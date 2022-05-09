import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

import { BarChart } from 'src/components/BarChart';
import { DataLine } from 'src/components/DataLine';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { IRouterProps } from 'src/routes/navigation';

import { IPractice } from 'src/data/types/IPractice';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import { Container, Scroll, InformationContainer, Data } from './styles';

export function SingleStatistic({ navigation, route }: IRouterProps) {
  const id = route.params?.id;

  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const [practice, setPractice] = useState<IPractice & { time: string }>({
    amountEasy: 0,
    amountMedium: 0,
    amountHard: 0,
    time: '',
  });

  async function loadPractice() {
    try {
      setLoadingRequest(true);
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
    } catch (err) {
      const error = getError(err as ErrorType);

      setModalResponseData({
        type: error.type,
        message: error.message,
        isVisible: true,
      });
    }
    setLoadingRequest(false);
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
        <LoaderRequest visible={loadingRequest} />
        <Modal
          type={modalResponseData.type}
          message={modalResponseData.message}
          visible={modalResponseData.isVisible}
          onPress={() =>
            setModalResponseData(old => ({ ...old, isVisible: false }))
          }
        />
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
