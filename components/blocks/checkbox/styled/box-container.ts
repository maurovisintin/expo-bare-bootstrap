import { ReactChild } from 'react';
import styled from 'styled-components/native';

type Props = {
  children: false | ReactChild;
  size: number;
  paddingTop: number;
};

const Box = styled.View<Props>`
  margin-right: 16px;
  padding-top: ${p => p.paddingTop}px;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`;

export default Box;
