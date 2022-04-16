import React from 'react';

import { Container, Bar, BarContainer, Line } from './styles';

type Props = {
  data: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
};

export function BarChart({ data }: Props) {
  return (
    <Container>
      <BarContainer>
        <Bar type="easy" percentage={(data.easy * 100) / data.total} />
        <Bar type="medium" percentage={(data.medium * 100) / data.total} />
        <Bar type="hard" percentage={(data.hard * 100) / data.total} />
      </BarContainer>
      <Line />
    </Container>
  );
}
