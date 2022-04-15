/* eslint-disable global-require */
import React from 'react';

import { RoundButton } from 'src/components/RoundButton';
import { Text } from 'src/components/Text';

import {
  Container,
  CelebrationImage,
  ButtonContainer,
  SkipButton,
} from './styles';

export function PracticeFinish() {
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
        <RoundButton title="Concluir" onPress={() => {}} />
        <SkipButton>
          <Text
            style={{ marginTop: 20 }}
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
            }}
          >
            Resultados
          </Text>
        </SkipButton>
      </ButtonContainer>
    </Container>
  );
}
