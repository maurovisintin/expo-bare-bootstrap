import React from 'react';

import * as styled from './styled';
import theme from '../../../theme';

type Props = {
  onPress: () => void;
};

const CircleButton = (props: Props) => {
  return <styled.Container {...props} activeOpacity={theme.buttons.opacity} />;
};

export default CircleButton;
