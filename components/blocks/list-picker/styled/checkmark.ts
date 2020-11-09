import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';

type Props = {
  modifiers?: any;
};

const Checkmark = styled.View<Props>`
  width: 8px;
  height: 26px;
  border-color: ${p => p.theme.colors.primary.main};
  border-right-width: 2px;
  border-bottom-width: 2px;
  transform: rotate(45deg);
  margin-bottom: 10px;

  ${applyStyleModifiers(modifiers)};
`;

export default Checkmark;
