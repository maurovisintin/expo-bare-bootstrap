import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';
import { ButtonSize, Colors, Color } from '../../../../theme';

type Props = {
  type: keyof Colors;
  size: keyof ButtonSize;
  modifiers?: string | string[];
  testID?: string;
  activeOpacity?: number;
};

const StyledButton = styled.TouchableOpacity<Props>`
  justify-content: center;
  align-items: center;
  background-color: ${p => (p.theme.colors[p.type] as Color).main};
  border-radius: 100px;
  padding: 0 20px;
  height: ${p => p.theme.buttons.height[p.size]};
  min-width: 100px;
  width: 100%;
  ${applyStyleModifiers(modifiers)};
`;

export default StyledButton;
