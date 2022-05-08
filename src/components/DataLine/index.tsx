import React from 'react';

import { Text } from 'src/components/Text';

import { Container } from './styles';

type Props = {
  type: 'easy' | 'medium' | 'hard' | 'title';
  field: string;
  label: string;
};

export function DataLine({ type, label, field }: Props) {
  return (
    <Container>
      <Text fontFamily="poppins_medium" color={type}>
        {field}
      </Text>

      <Text color={type}>{label}</Text>
    </Container>
  );
}
