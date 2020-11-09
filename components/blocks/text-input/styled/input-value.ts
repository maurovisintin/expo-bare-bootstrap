import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from '../../../elements/input-field/styled/modifiers';
import { CustomTheme } from '../../../../theme';

type Props = {
  modifiers?: any;
  testID?: string;
  theme: CustomTheme;
};

const InputValue = styled.TextInput<Props>`
  color: ${p => p.theme.colors.grayDark.main};
  font-size: ${p => p.theme.fontSize.paragraph};
  font-family: ${p => p.theme.fonts.sansSerif};
  background-color: transparent;
  text-align-vertical: bottom;
  padding-top: ${p => p.theme.fontSize.paragraph};
  padding-bottom: 0px;
  padding-left: 0px;
  ${applyStyleModifiers(modifiers)};
`;

export default InputValue;
