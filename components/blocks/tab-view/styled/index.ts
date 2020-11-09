import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';
import modifiers from './modifiers';

type Props = {
  modifiers?: any;
  activeOpacity?: number;
};

const TabContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 0;
  border-bottom-width: 1px;
  border-color: ${p => p.theme.colors.grayLighter.main};
`;

const TabContent = styled.View`
  flex: 1;
`;

const Line = styled.View<Props>`
  background-color: white;
  height: 3px;
  width: 100%;
  border-radius: 1.5px;
  ${applyStyleModifiers(modifiers)};
`;

const TouchableElement = styled.TouchableOpacity<Props>`
  justify-content: center;
  align-items: center;
  padding-top: 3px;
`;

const TextWrapper = styled.View`
  padding-horizontal: ${p => p.theme.paddings.small};
  padding-vertical: ${p => p.theme.paddings.extraSmall};
`;

export { TabContainer, TabContent, TouchableElement, Line, TextWrapper };
