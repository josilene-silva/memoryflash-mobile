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
import { LoaderRequest } from 'src/components/LoaderRequest';
import { IModalData, Modal } from 'src/components/Modal';

import { IRouterProps } from 'src/routes/navigation';

import { ICard, ISet } from 'src/data/types';

import { api } from 'src/services/api';

import { ErrorType, getError } from 'src/utils/error';

import {
  Container,
  ProgressBar,
  Progress,
  Card,
  ButtonContainer,
  LevelContainer,
  LevelButton,
} from './styles';

interface CardsProps extends ICard {
  side: number;
}

type SetProps = Omit<ISet, 'cards' | 'practices'>;

const FRONT = 0;
const BACK = 1;

const EASY = 0;
const MEDIUM = 1;
const HARD = 2;

export function PracticeCard({ navigation, route }: IRouterProps) {
  const id = route.params?.id;

  const flipPositionAnimate = useSharedValue(0);

  const [currentCard, setCurrentCard] = useState(0);
  const [startTime, setStartTime] = useState<Date>();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [modalResponseData, setModalResponseData] = useState<IModalData>({
    type: 'attention',
    message: '',
    isVisible: false,
  });

  const cardListRef = useRef<FlatList>(null);

  const [cards, setCards] = useState<CardsProps[]>([] as CardsProps[]);

  const [set, setSet] = useState<SetProps>({} as SetProps);

  async function loadCardsSet() {
    setLoadingRequest(true);
    try {
      const { data } = await api.get(`/sets/${id}`);
      const cardsFormatted: CardsProps[] = data.cards.map(card => ({
        ...card,
        side: 0,
      }));
      setCards(cardsFormatted);
      setSet(data);
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

  useFocusEffect(
    useCallback(() => {
      loadCardsSet();
      setStartTime(new Date());
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

  function changeCardDifficultyLevel(
    item: CardsProps,
    difficultyLevel: number,
  ) {
    const cardsUpdate = cards.map(card => {
      if (card.id === item.id) {
        card.difficultyLevel = difficultyLevel;
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

  function haveCards() {
    const totalCards = cards.length - 1;
    return currentCard < totalCards;
  }

  function formatPracticePayload() {
    const amount = {
      amountEasy: 0,
      amountMedium: 0,
      amountHard: 0,
    };

    cards.map(card => {
      if (card.difficultyLevel === EASY) amount.amountEasy += 1;
      if (card.difficultyLevel === MEDIUM) amount.amountMedium += 1;
      if (card.difficultyLevel === HARD) amount.amountHard += 1;
    });

    return {
      setId: id,
      startTime,
      endTime: new Date(),
      amountEasy: amount.amountEasy,
      amountMedium: amount.amountMedium,
      amountHard: amount.amountHard,
    };
  }

  async function finishPractice() {
    const payloadCards = cards.map(card => ({
      id: card.id,
      difficultyLevel: card.difficultyLevel,
      setId: id,
    }));

    const promises = [
      api.patch(`/cards`, payloadCards),
      api.post(`/practices`, formatPracticePayload()),
    ];

    try {
      setLoadingRequest(true);
      const [_, response] = await Promise.all(promises);
      navigation.dispatch(
        StackActions.replace('PracticeFinish', {
          id: response.data.id,
          name: set.name,
        }),
      );
      setLoadingRequest(false);
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

  function handleSelectDifficultyLevel(
    card: CardsProps,
    difficultyLevel: number,
  ) {
    changeCardDifficultyLevel(card, difficultyLevel);
    if (haveCards()) {
      changeCardAnimationSide();
      handleFlipCard();
    } else {
      finishPractice();
    }
  }

  return (
    <Container>
      <LoaderRequest visible={loadingRequest} />
      <Modal
        type={modalResponseData.type}
        message={modalResponseData.message}
        visible={modalResponseData.isVisible}
        onPress={() =>
          setModalResponseData(old => ({ ...old, isVisible: false }))
        }
      />

      <ProgressBar>
        <Progress percentage={(currentCard * 100) / cards.length} />
      </ProgressBar>

      <FlatList
        ref={cardListRef}
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View>
              <Card
                visible={item.side === FRONT}
                type="front"
                style={frontCardAnimated}
              >
                <Text color="title">{item.front}</Text>
              </Card>

              <Card
                visible={item.side === BACK}
                type="back"
                style={backCardAnimated}
              >
                <Text color="white">{item.back}</Text>
              </Card>

              <ButtonContainer visible={item.side === FRONT}>
                <RoundButton
                  title="Visualizar"
                  onPress={() => handleSeeBack(item)}
                />
              </ButtonContainer>

              <LevelContainer visible={item.side === BACK}>
                <LevelButton
                  onPress={() => handleSelectDifficultyLevel(item, EASY)}
                >
                  <Text fontFamily="poppins_bold" color="easy">
                    F??cil
                  </Text>
                </LevelButton>
                <LevelButton
                  onPress={() => handleSelectDifficultyLevel(item, MEDIUM)}
                >
                  <Text fontFamily="poppins_bold" color="medium">
                    Mediano
                  </Text>
                </LevelButton>
                <LevelButton
                  onPress={() => handleSelectDifficultyLevel(item, HARD)}
                >
                  <Text fontFamily="poppins_bold" color="hard">
                    Dif??cil
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
