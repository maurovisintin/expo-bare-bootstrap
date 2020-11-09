import styled from 'styled-components/native';

import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';

type Props = {
  modifiers?: any;
};

const SpinnerContainer = styled.View<Props>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${applyStyleModifiers(modifiers)};
`;

export default SpinnerContainer;
