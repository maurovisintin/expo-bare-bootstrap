import React from 'react';
import StyledText from './styled';

const Text = (props: any) => {
  const { children } = props;
  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
