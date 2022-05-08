/* eslint-disable global-require */
import { StackActions } from '@react-navigation/native';
import React from 'react';

import { RoundButton } from 'src/components/RoundButton';

import { IRouterProps } from 'src/routes/navigation';

import {
  Container,
  CelebrationImage,
  ButtonContainer,
  SkipButton,
  FullReview,
  GoBack,
} from './styles';

export function PracticeFinish({ navigation, route }: IRouterProps) {
  const id = route.params?.id;
  const name = route.params?.name;

  return (
    <Container>
      <CelebrationImage source={require('src/assets/images/celebration.png')} />
      <FullReview>Revisão completa</FullReview>
      <ButtonContainer>
        <RoundButton
          title="Resultados"
          onPress={() => {
            navigation.dispatch(
              StackActions.replace('SingleStatistic', { name, id }),
            );
          }}
        />
        <SkipButton onPress={() => navigation.goBack()}>
          <GoBack>Voltar</GoBack>
        </SkipButton>
      </ButtonContainer>
    </Container>
  );
}
