import { ReactChild } from 'react';
import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';

type Props = {
  type: string;
  modifiers?: any;
  children: false | ReactChild;
};

const Box = styled.View<Props>`
  width: ${p => p.theme.checkboxes.size.regular};
  height: ${p => p.theme.checkboxes.size.regular};
  border-width: 1px;
  justify-content: center;
  align-items: center;
  border-color: ${p => p.theme.colors.gray.main};
  background-color: #fff;
  border-radius: 3px;
  ${applyStyleModifiers(modifiers)};
`;

export default Box;
