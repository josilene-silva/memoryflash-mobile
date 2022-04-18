import React from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Form/Button';
import { IRouterProps } from 'src/routes/navigation';

import { api } from 'src/services/api';

import { Container, Fields, Form, Scroll } from './styles';

type Inputs = {
  front?: string;
  back?: string;
};

export function CreateCard({ route }: IRouterProps) {
  const { setId } = route.params;

  const schema = Yup.object().shape({
    front: Yup.string().required('Frente é obrigatória'),
    back: Yup.string().required('Verso é obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
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
      await api.post('/cards', payload);
      Alert.alert(`Sucesso`, `Cartão cadastrado`);
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.message}`);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Scroll>
        <Container>
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
