import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputForm } from 'src/components/Form/InputForm';
import { Button } from 'src/components/Form/Button';

import { api, setupAxiosToken } from 'src/services/api';

import { useAuth } from 'src/hooks/auth';

import { IRouterProps } from 'src/routes/navigation';

import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { getError, ErrorType } from 'src/utils/error';

import {
  Container,
  Title,
  Subtitle,
  Header,
  Form,
  ForgotPasswordText,
  ForgotPassword,
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
};

export function Login({ navigation }: IRouterProps) {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const schema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const { onAuthUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'josilenevitoriasilva@gmail.com',
      password: '123',
    },
  });

  async function handleRegister({ email, password }: Inputs) {
    const payload = {
      email,
      password,
    };
    try {
      setLoadingRequest(true);
      const { data } = await api.post('/login', payload);
      onAuthUser({
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      });
      setupAxiosToken(data.token);
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
          <Title>Bem vindo de volta!</Title>
          <Subtitle>Use suas credenciais para entrar na sua conta</Subtitle>
        </Header>

        <Form>
          <Fields>
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
            />

            <ForgotPassword>
              <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
            </ForgotPassword>
          </Fields>

          <Button title="Entrar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <AccountAction>
          <Question>Não possui conta? </Question>
          <Action>
            <ActionText onPress={() => navigation.navigate('Register')}>
              Cadastre-se
            </ActionText>
          </Action>
        </AccountAction>
      </Container>
    </Scroll>
  );
}
