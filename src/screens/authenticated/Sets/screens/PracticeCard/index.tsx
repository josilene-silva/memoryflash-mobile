import React, { useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

import { Text } from 'src/components/Text';
import { RoundButton } from 'src/components/RoundButton';

import { IRouterProps } from 'src/routes/navigation';
import {
  Container,
  ProgressBar,
  Progress,
  Card,
  ButtonContainer,
  SkipButton,
  LevelContainer,
  LevelButton,
} from './styles';

export function PracticeCard({ navigation }: IRouterProps) {
  const flipPositionAnimate = useSharedValue(0);
  const [side, setSide] = useState(0);

  const frontCardAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            flipPositionAnimate.value,
            [0, 1],
            [0, 180],
          )}deg`,
        },
      ],
    };
  });

  const backCardAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            flipPositionAnimate.value,
            [0, 1],
            [180, 360],
          )}deg`,
        },
      ],
    };
  });

  function handleFlipCard() {
    setSide(side === 0 ? 1 : 0);
    const newValue = flipPositionAnimate.value === 0 ? 1 : 0;
    flipPositionAnimate.value = withTiming(newValue, { duration: 300 });
  }

  return (
    <Container>
      <ProgressBar>
        <Progress percentage={50} />
      </ProgressBar>

      <Card visible={side === 0} type="front" style={frontCardAnimated}>
        <Text
          variant={{
            fontFamily: 'poppins_regular',
            fontSize: 18,
            color: 'title',
          }}
        >
          Triângulo retângulo
        </Text>
      </Card>

      <Card visible={side === 1} type="back" style={backCardAnimated}>
        <Text
          variant={{
            fontFamily: 'poppins_regular',
            fontSize: 13,
            color: 'white',
          }}
        >
          É um triângulo que contém um ângulo de 90º, independentemente de qual
          lado ele estiver.
        </Text>
      </Card>

      <ButtonContainer visible={side === 0}>
        <RoundButton title="Visualizar" onPress={() => handleFlipCard()} />
        <SkipButton>
          <Text
            style={{ marginTop: 20 }}
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
            }}
          >
            Pular
          </Text>
        </SkipButton>
      </ButtonContainer>

      <LevelContainer visible={side === 1}>
        <LevelButton onPress={() => navigation.navigate('PracticeFinish')}>
          <Text
            variant={{
              fontFamily: 'poppins_bold',
              fontSize: 16,
              color: 'easy',
            }}
          >
            Fácil
          </Text>
        </LevelButton>
        <LevelButton>
          <Text
            variant={{
              fontFamily: 'poppins_bold',
              fontSize: 16,
              color: 'medium',
            }}
          >
            Mediano
          </Text>
        </LevelButton>
        <LevelButton>
          <Text
            variant={{
              fontFamily: 'poppins_bold',
              fontSize: 16,
              color: 'hard',
            }}
          >
            Difícil
          </Text>
        </LevelButton>
      </LevelContainer>
    </Container>
  );
}
