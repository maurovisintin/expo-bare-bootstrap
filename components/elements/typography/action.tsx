import React, { ReactChild } from 'react';

import theme from '../../../theme';
import Text from '../text';

type Props = {
  children: ReactChild;
  onPress?: () => void;
};

const Action = ({ children, onPress }: Props) => (
  <Text
    onPress={onPress}
    fontFamily="sansSerif"
    modifiers={['bold']}
    color={theme.colors.primary.main}
  >
    {children}
  </Text>
);

export default Action;
