import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { SetsCard } from 'src/components/SetsCard';
import { Text } from 'src/components/Text';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { IRouterProps } from 'src/routes/navigation';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import { Container, Header, SetsList } from './styles';

export function Statistics({ navigation }: IRouterProps) {
  const [sets, setSets] = useState<ISet[]>([]);

  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  async function loadSets() {
    try {
      setLoadingRequest(true);
      const response = await api.get('/sets');
      const dataSets: ISet[] = response.data;

      const dataFormatted = dataSets.filter(set => set.practices.length > 0);

      setSets(dataFormatted);
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
      loadSets();
    }, []),
  );

  return (
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
      <Header>
        <Text variant="titlePrimaryMontserratBold">Estatísticas</Text>
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
