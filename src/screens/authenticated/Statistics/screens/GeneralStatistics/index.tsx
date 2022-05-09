import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { BarChart } from 'src/components/BarChart';
import { DataLine } from 'src/components/DataLine';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { IRouterProps } from 'src/routes/navigation';

import { IPractice } from 'src/data/types/IPractice';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import { Container, Scroll, InformationContainer, Data } from './styles';

interface IPracticeData extends IPractice {
  timesPracticed: number;
}

export function GeneralStatistics({ navigation, route }: IRouterProps) {
  const id = route.params?.id;

  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const [practice, setPractice] = useState<IPracticeData>({
    amountEasy: 0,
    amountMedium: 0,
    amountHard: 0,
    timesPracticed: 0,
  });

  function configureAgreement(value: number): string {
    if (value === 1) {
      return `${value} cartão`;
    }
    return `${value} cartões`;
  }

  async function loadPractice() {
    try {
      setLoadingRequest(true);
      const { data } = await api.get(`/sets/${id}`);
      const { practices } = data;

      const amount = {
        amountEasy: 0,
        amountMedium: 0,
        amountHard: 0,
      };

      practices.forEach((elem: IPracticeData) => {
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
          <DataLine
            type="title"
            field="Praticado"
            label={`${practice.timesPracticed} vez(es)`}
          />
        </InformationContainer>
      </Container>
    </Scroll>
  );
}
