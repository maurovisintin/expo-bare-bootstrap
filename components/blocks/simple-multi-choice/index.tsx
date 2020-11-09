import React from 'react';

import styled from 'styled-components/native';
import ChoiceItem, { ChoiceItemProps } from './choice-item';

export type Props = {
  data: ChoiceItemProps[];
  onSelect: (val: string) => void;
  value?: string;
};

const Container = styled.View``;

const SimpleMultiChoice = ({ onSelect, value, data }: Props) => (
  <Container>
    {data.map((el: ChoiceItemProps) => (
      <ChoiceItem key={el.code} item={el} value={value} onSelect={onSelect} />
    ))}
  </Container>
);

export default SimpleMultiChoice;
