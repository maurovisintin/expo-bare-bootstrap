import React, { ReactChild } from 'react';

import theme from '../../../theme';
import Text from '../text';

type Props = {
  children: ReactChild;
  modifiers?: string[];
};

const P = ({ children, modifiers = [] }: Props) => (
  <Text
    fontFamily="sansSerif"
    modifiers={['light', ...modifiers]}
    fontSize={theme.fontSize.paragraph}
  >
    {children}
  </Text>
);

export default P;
