import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';

type Props = {
  background?: string;
  modifiers?: any;
};

const StyledContainer = styled.View<Props>`
  flex: 1;
  background-color: ${p => p.background || 'white'};
  ${applyStyleModifiers(modifiers)};
`;

export default StyledContainer;
