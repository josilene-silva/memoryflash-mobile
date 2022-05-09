import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Form/Button';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { IRouterProps } from 'src/routes/navigation';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import { Container, Fields, Form, Scroll } from './styles';

type Inputs = {
  front?: string;
  back?: string;
};

export function CreateCard({ route }: IRouterProps) {
  const setId = route?.params?.setId as string;

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const schema = Yup.object().shape({
    front: Yup.string().required('Frente é obrigatória'),
    back: Yup.string().required('Verso é obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  async function handleCreateCard({ front, back }: Inputs) {
    const payload = {
      front,
      back,
      setId,
    };
    try {
      setLoadingRequest(true);

      await api.post('/cards', payload);

      reset();
      setModalResponseData({
        type: 'success',
        message: 'Cartão cadastrado',
        isVisible: true,
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <Form>
            <Fields>
              <InputForm
                placeholder="Frente"
                name="front"
                numberOfLines={2}
                multiline
                control={control}
                error={errors.front && errors.front.message}
                returnKeyType="next"
              />

              <InputForm
                placeholder="Verso"
                numberOfLines={2}
                multiline
                name="back"
                control={control}
                error={errors.back && errors.back.message}
              />
            </Fields>
            <Button title="Salvar" onPress={handleSubmit(handleCreateCard)} />
          </Form>
        </Container>
      </Scroll>
    </TouchableWithoutFeedback>
  );
}
