import React from 'react';
import { useTheme } from 'styled-components';

import { Text } from '../../../../../components/Text';
import { CardLayout } from '../../../../../components/Layout/Card';

import { Container, Scroll, Icon, IconContainer, IconItem } from './styles';

export function ListSet() {
  const theme = useTheme();

  return (
    <Scroll>
      <Container>
        <IconContainer>
          <IconItem>
            <Icon color={theme.colors.text_dark} size={24} name="edit-3" />
            <Text
              variant={{
                fontFamily: 'poppins_medium',
                color: 'text_dark',
              }}
            >
              Editar
            </Text>
          </IconItem>

          <IconItem>
            <Icon color={theme.colors.gray_medium} size={24} name="trash" />
            <Text
              variant={{
                fontFamily: 'poppins_medium',
                color: 'gray_medium',
              }}
            >
              Excluir
            </Text>
          </IconItem>
        </IconContainer>

        <CardLayout style={{ marginTop: 30 }}>
          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'text_dark',
            }}
          >
            Sobre
          </Text>
          <Text
            variant={{
              fontFamily: 'poppins_regular',
              color: 'text_dark',
            }}
            style={{ marginTop: 11 }}
          >
            A trigonometria é a área da matemática que estuda a relação entre a
            medida dos lados de um triângulo e seus ângulos.
          </Text>
        </CardLayout>

        <IconItem style={{ marginVertical: 29 }}>
          <Icon color={theme.colors.primary} size={32} name="plus" />
          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'primary',
            }}
          >
            Adicionar cartão
          </Text>
        </IconItem>

        <CardLayout style={{ marginBottom: 20 }}>
          <Text
            variant={{
              fontFamily: 'montserrat_bold',
              color: 'text_dark',
            }}
            style={{ marginTop: 11 }}
          >
            Triângulo Retângulo
          </Text>
          <Text
            variant={{
              fontFamily: 'poppins_regular',
              color: 'text_dark',
            }}
          >
            É um triângulo que contém um ângulo de 90º, independentemente de
            qual lado ele estiver.
          </Text>
          <IconContainer style={{ justifyContent: 'flex-start' }}>
            <Icon color={theme.colors.gray_medium} size={24} name="trash" />
            <Icon color={theme.colors.text_dark} size={24} name="edit-3" />
          </IconContainer>
        </CardLayout>
      </Container>
    </Scroll>
  );
}
