import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';
import { ButtonSize } from '../../../../theme';

type Props = {
  type: string;
  size: keyof ButtonSize;
  // eslint-disable-next-line
  modifiers: any;
  testID?: string;
  activeOpacity?: number;
};

const StyledButton = styled.TouchableOpacity<Props>`
  background-color: transparent;
  border-width: 0px;
  border-radius: 100px;
  padding: 0 20px;
  border-color: transparent;
  justify-content: center;
  align-items: center;
  height: ${p => p.theme.buttons.height[p.size || 'regular']};

  ${applyStyleModifiers(modifiers)};
`;

export default StyledButton;
