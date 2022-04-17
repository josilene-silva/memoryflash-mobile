import React from 'react';

import { Container, Bar, BarContainer, Line } from './styles';

type Props = {
  data: {
    amountEasy: number;
    amountMedium: number;
    amountHard: number;
    total: number;
  };
};

export function BarChart({ data }: Props) {
  return (
    <Container>
      <BarContainer>
        <Bar type="easy" percentage={(data.amountEasy * 100) / data.total} />
        <Bar
          type="medium"
          percentage={(data.amountMedium * 100) / data.total}
        />
        <Bar type="hard" percentage={(data.amountHard * 100) / data.total} />
      </BarContainer>
      <Line />
    </Container>
  );
}
