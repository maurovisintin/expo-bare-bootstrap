import React from 'react';
import StyledSpacedContainer from './styled';

type Props = {
  children: any;
};

const Container = ({ children }: Props) => (
  <StyledSpacedContainer>{children}</StyledSpacedContainer>
);

export default Container;
