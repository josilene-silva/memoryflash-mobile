/* eslint-disable global-require */
import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { RoundButton } from 'src/components/RoundButton';
import { SetsCard } from 'src/components/SetsCard';
import { Text } from 'src/components/Text';

import { IRouterProps } from 'src/routes/navigation';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';
import { ErrorType, getError } from 'src/utils/error';
import { Image, View } from 'react-native';
import { Container, Header, SetsList, FloatButton } from './styles';

export function Sets({ navigation }: IRouterProps) {
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
      const { data } = await api.get('/sets');
      setSets(data);
    } catch (err) {
      const error = getError(err as ErrorType);

      setModalResponseData({
        type: error.type,
        message: error.message,
        isVisible: true,
      });
      setSets([]);
    }
    setLoadingRequest(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadSets();
    }, []),
  );

  const empty = useMemo(
    () => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
        }}
      >
        <Image
          style={{ marginTop: '30%' }}
          source={require('src/assets/images/cards-empty.png')}
        />
        <Text
          fontFamily="montserrat_bold"
          color="primary"
          fontSize={20}
          style={{ marginTop: 50 }}
        >
          Nenhum conjunto encontrado
        </Text>
      </View>
    ),
    [],
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
        <Text variant="titlePrimaryMontserratBold">Conjunto de cartões</Text>
      </Header>

      <SetsList
        data={sets}
        keyExtractor={item => item?.id}
        renderItem={({ item }) => (
          <SetsCard
            data={item}
            onPress={() =>
              navigation.navigate('ListSet', { name: item.name, id: item.id })
            }
          />
        )}
        ListEmptyComponent={() => empty}
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
