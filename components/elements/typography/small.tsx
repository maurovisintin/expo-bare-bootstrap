import React, { ReactChild } from 'react';

import theme from '../../../theme';
import Text from '../text';

type Props = {
  children: ReactChild;
};

const Small = ({ children }: Props) => (
  <Text
    fontFamily="sansSerif"
    modifiers={['light']}
    fontSize={theme.fontSize.small}
  >
    {children}
  </Text>
);

export default Small;
