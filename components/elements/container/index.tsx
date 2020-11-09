import React from 'react';
import StyledContainer from './styled';

type Props = {
  children: any;
  background?: string;
  modifiers?: any;
};

const Container = ({ background = 'white', modifiers, children }: Props) => (
  <StyledContainer background={background} modifiers={modifiers}>
    {children}
  </StyledContainer>
);

export default Container;
