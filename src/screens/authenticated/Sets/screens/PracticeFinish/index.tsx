/* eslint-disable global-require */
import { StackActions } from '@react-navigation/native';
import React from 'react';

import { RoundButton } from 'src/components/RoundButton';
import { Text } from 'src/components/Text';

import { IRouterProps } from 'src/routes/navigation';

import {
  Container,
  CelebrationImage,
  ButtonContainer,
  SkipButton,
} from './styles';

export function PracticeFinish({ navigation, route }: IRouterProps) {
  const id = route.params?.id;
  const name = route.params?.name;

  return (
    <Container>
      <CelebrationImage source={require('src/assets/images/celebration.png')} />
      <Text
        style={{ marginTop: 50 }}
        variant={{
          fontFamily: 'montserrat_bold',
          color: 'primary',
          fontSize: 19,
        }}
      >
        Revisão completa
      </Text>
      <ButtonContainer>
        <RoundButton
          title="Resultados"
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('SingleStatistic', {
                name,
                id,
              }),
            );
          }}
        />
        <SkipButton onPress={() => navigation.goBack()}>
          <Text
            style={{ marginTop: 20 }}
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
            }}
          >
            Voltar
          </Text>
        </SkipButton>
      </ButtonContainer>
    </Container>
  );
}
