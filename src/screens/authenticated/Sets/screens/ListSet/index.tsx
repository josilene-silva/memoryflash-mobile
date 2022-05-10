import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { IRouterProps } from 'src/routes/navigation';

import { RoundButton } from 'src/components/RoundButton';
import { CardLayout } from 'src/components/Layout/Card';
import { CardsCard } from 'src/components/CardsCard';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';
import { Icon } from 'src/components/Icon';

import { ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import {
  Container,
  Scroll,
  IconContainer,
  IconItem,
  CardsList,
  FloatButton,
  Category,
  About,
  Description,
  AddCard,
} from './styles';

type ISetData = Omit<ISet, 'practices'>;

export function ListSet({ route, navigation }: IRouterProps) {
  const id = route.params?.id as string;

  const [set, setSet] = useState<ISetData>({} as ISetData);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  async function loadSet() {
    try {
      setLoadingRequest(true);
      const { data } = await api.get(`/sets/${id}`);
      setSet(data);
    } catch (err) {
      const error = getError(err as ErrorType);

      setModalResponseData({
        type: error.type,
        message: error.message,
        isVisible: true,
      });
      setSet({} as ISetData);
    }
    setLoadingRequest(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadSet();
    }, []),
  );

  const header = useMemo(
    () =>
      JSON.stringify(set) === '{}' ? (
        <View />
      ) : (
        <>
          <IconContainer>
            <IconItem>
              <Icon color="gray_medium" size={24} name="trash" />
            </IconItem>

            <IconItem>
              <Icon color="text_dark" size={24} name="edit-3" />
            </IconItem>
          </IconContainer>

          <CardLayout style={{ marginTop: 30 }}>
            <Category>{set?.category?.name}</Category>

            <About>Sobre</About>
            <Description>{set?.description}</Description>
          </CardLayout>

          <IconItem
            style={{ marginVertical: 29 }}
            onPress={() => navigation.navigate('CreateCard', { setId: set.id })}
          >
            <Icon color="primary" size={32} name="plus" />
            <AddCard>Adicionar cartão</AddCard>
          </IconItem>
        </>
      ),
    [navigation, set],
  );

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
        <CardsList
          ListHeaderComponent={() => header}
          data={set.cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardsCard data={item} />}
        />
      </Container>
      <FloatButton>
        <RoundButton
          title="Iniciar prática"
          onPress={() => {
            if (set.cards.length > 2) {
              navigation.navigate('PracticeCard', { id: set.id });
            } else {
              setModalResponseData({
                type: 'attention',
                message: 'Você não possui cartões suficiente!',
                isVisible: true,
              });
            }
          }}
        />
      </FloatButton>
    </Scroll>
  );
}
