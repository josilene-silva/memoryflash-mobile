import React from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputForm } from '../../../components/Form/InputForm';
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

import { Button } from '../../../components/Form/Button';

import { api, setupAxiosToken } from '../../../services/api';

import { useAuth } from '../../../hooks/auth';
import { IRouterProps } from '../../../routes/navigation';

type Inputs = {
  password?: string;
  email?: string;
};

export function Login({ navigation }: IRouterProps) {
  const schema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const { onAuthUser, user } = useAuth();

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
      const { data } = await api.post('/login', payload);
      onAuthUser({
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      });

      setupAxiosToken(data.token);
      Alert.alert(`Sucesso`, `Bem vindo(a) ${user.name}`);
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.message}`);
    }
  }

  return (
    <Scroll>
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
