import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Form/Button';
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { api } from 'src/services/api';

import { IRouterProps } from 'src/routes/navigation';

import { ErrorType, getError } from 'src/utils/error';

import {
  Container,
  Title,
  Subtitle,
  Header,
  Form,
  Fields,
  AccountAction,
  Question,
  Action,
  Scroll,
  ActionText,
} from './styles';

type Inputs = {
  password?: string;
  email?: string;
  name?: string;
  confirmPassword?: string;
};

export function Register({ navigation }: IRouterProps) {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const schema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
    name: Yup.string().required('Nome é obrigatório'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Confirmar senha tem que ser igual à senha',
      )
      .required('Confirmar senha é obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  async function handleRegister({ email, password, name }: Inputs) {
    const payload = {
      email,
      password,
      name,
    };
    try {
      setLoadingRequest(true);
      await api.post('/users', payload);

      setModalResponseData({
        type: 'success',
        message: 'Usuário cadastrado',
        isVisible: true,
      });

      reset();
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
    <Scroll>
      <LoaderRequest visible={loadingRequest} />
      <Modal
        type={modalResponseData.type}
        message={modalResponseData.message}
        visible={modalResponseData.isVisible}
        onPress={() =>
          setModalResponseData(old => ({ ...old, isVisible: false }))
        }
      />
      <Container>
        <Header>
          <Title>Crie uma nova conta</Title>
          <Subtitle>Crie uma conta para gerenciar seus flashcards</Subtitle>
        </Header>

        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="none"
              error={errors.name && errors.name.message}
              returnKeyType="next"
            />

            <InputForm
              placeholder="Email"
              control={control}
              autoCapitalize="none"
              name="email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
              returnKeyType="next"
            />

            <InputForm
              placeholder="Senha"
              control={control}
              name="password"
              secureTextEntry
              error={errors.password && errors.password.message}
              returnKeyType="next"
            />

            <InputForm
              placeholder="Confirmar senha"
              control={control}
              name="confirmPassword"
              secureTextEntry
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
          </Fields>

          <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <AccountAction>
          <Question>Já possui uma conta? </Question>
          <Action>
            <ActionText onPress={() => navigation.navigate('Login')}>
              Entrar
            </ActionText>
          </Action>
        </AccountAction>
      </Container>
    </Scroll>
  );
}
