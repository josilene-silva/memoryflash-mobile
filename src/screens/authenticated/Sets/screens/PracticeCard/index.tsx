/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { StackActions, useFocusEffect } from '@react-navigation/native';

import { Text } from 'src/components/Text';
import { RoundButton } from 'src/components/RoundButton';

import { IRouterProps } from 'src/routes/navigation';
import { ICard } from 'src/data/types';

import { api } from 'src/services/api';

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

interface CardsProps extends ICard {
  side: number;
}

export function PracticeCard({ navigation, route }: IRouterProps) {
  const { id } = route.params;

  const flipPositionAnimate = useSharedValue(0);

  const [currentCard, setCurrentCard] = useState(0);
  const cardListRef = useRef<FlatList>(null);

  const [cards, setCards] = useState<CardsProps[]>([
    {
      id: '',
      front: '',
      back: '',
      difficultyLevel: 0,
      side: 0,
    },
  ]);

  async function loadCardsSet() {
    try {
      const { data } = await api.get(`/sets/${id}`);
      const cardsFormatted: CardsProps[] = data.cards.map(card => ({
        ...card,
        side: 0,
      }));
      setCards(cardsFormatted);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      loadCardsSet();
    }, []),
  );

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
    const newValue = flipPositionAnimate.value === 0 ? 1 : 0;
    flipPositionAnimate.value = withTiming(newValue, { duration: 300 });
  }

  function changeCardSide(item: CardsProps) {
    const cardsUpdate = cards.map(card => {
      if (card.id === item.id) {
        card.side = 1;
      }
      return card;
    });
    setCards(cardsUpdate);
  }

  function handleSeeBack(card: CardsProps) {
    changeCardSide(card);
    handleFlipCard();
  }

  function changeCardAnimationSide() {
    cardListRef.current?.scrollToIndex({
      index: currentCard + 1,
      animated: true,
    });
    setCurrentCard(prevState => prevState + 1);
  }

  function handleSelectDifficultLevel() {
    const totalCards = cards.length - 1;
    if (currentCard < totalCards) {
      changeCardAnimationSide();
      handleFlipCard();
    } else {
      navigation.dispatch(StackActions.replace('PracticeFinish', { id }));
    }
  }

  return (
    <Container>
      <ProgressBar>
        <Progress percentage={50} />
      </ProgressBar>

      <FlatList
        ref={cardListRef}
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <Card
                visible={item.side === 0}
                type="front"
                style={frontCardAnimated}
              >
                <Text
                  variant={{
                    fontFamily: 'poppins_regular',
                    color: 'title',
                  }}
                >
                  {item.front}
                </Text>
              </Card>

              <Card
                visible={item.side === 1}
                type="back"
                style={backCardAnimated}
              >
                <Text
                  variant={{
                    fontFamily: 'poppins_regular',
                    color: 'white',
                  }}
                >
                  {item.back}
                </Text>
              </Card>

              <ButtonContainer visible={item.side === 0}>
                <RoundButton
                  title="Visualizar"
                  onPress={() => handleSeeBack(item)}
                />
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

              <LevelContainer visible={item.side === 1}>
                <LevelButton onPress={() => handleSelectDifficultLevel()}>
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
            </View>
          );
        }}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentCard}
      />
    </Container>
  );
}
