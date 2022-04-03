import React from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputForm } from '../../components/Form/InputForm';
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

import { Button } from '../../components/Form/Button';

import api from '../../services/api';
import { IRouterProps } from '../../routes/navigation';

type Inputs = {
  password?: string;
  email?: string;
  name?: string;
  confirmPassword?: string;
};

export function Register({ navigation }: IRouterProps) {
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
      await api.post('/users', payload);
      Alert.alert(`Success`, `Usuário cadastrado`);
    } catch (err) {
      Alert.alert('Error', `${err.response.data.message}`);
    }
  }

  return (
    <Scroll>
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
