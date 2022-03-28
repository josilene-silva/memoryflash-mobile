import React from 'react';
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
  ForgotPasswordText,
  ForgotPassword,
  Fields,
  AccountAction,
  Question,
  Action,
  Scroll,
  ActionText,
} from './styles';
import { Button } from '../../components/Form/Button';

type Inputs = {
  password?: string;
  email?: string;
};

export function Login() {
  const schema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  function handleRegister(data: Inputs) {
    console.log(data);
  }

  return (
    <Container>
      <Scroll>
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
            <ActionText>Cadastre-se</ActionText>
          </Action>
        </AccountAction>
      </Scroll>
    </Container>
  );
}
