import React from 'react';

import ChoiceItem, { ChoiceItemProps } from './choice-item';

export type Props = {
  data: ChoiceItemProps[];
  onSelect: (val: string) => void;
  value?: string;
};

const MultiChoice = ({ onSelect, value, data }: Props) => (
  <>
    {data.map((el: ChoiceItemProps) => (
      <ChoiceItem
        key={el.code}
        item={el}
        value={value}
        onSelect={onSelect}
        testID={el.code}
      />
    ))}
  </>
);

export default MultiChoice;
