import React, { ReactChild } from 'react';

import theme from '../../../theme';
import Text from '../text';

type Props = {
  children: ReactChild;
};

const H5 = ({ children }: Props) => (
  <Text fontFamily="serif" modifiers={['black']} fontSize={theme.fontSize.h5}>
    {children}
  </Text>
);

export default H5;
