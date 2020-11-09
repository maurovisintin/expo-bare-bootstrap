import React, { ReactChild } from 'react';

import theme from '../../../theme';
import Text from '../text';

type Props = {
  children: ReactChild;
};

const H4 = ({ children }: Props) => (
  <Text fontFamily="serif" modifiers={['black']} fontSize={theme.fontSize.h4}>
    {children}
  </Text>
);

export default H4;
