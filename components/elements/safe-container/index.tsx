import React from 'react';
import StyledContainer from './styled';

type Props = {
  children: any;
  background?: string;
};

const Container = ({ background = 'white', children }: Props) => (
  <StyledContainer background={background}>{children}</StyledContainer>
);

export default Container;
