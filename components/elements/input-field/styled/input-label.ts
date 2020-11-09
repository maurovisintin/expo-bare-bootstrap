import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers from './modifiers';

type Props = {
  modifiers: any;
};

const InputLabel = styled.Text<Props>`
  color: ${p => p.theme.colors.grayDark.main};
  font-size: ${p => p.theme.fontSize.paragraph};
  font-family: ${p => p.theme.fonts.sansSerif};
  line-height: ${p =>
    parseInt(p.theme.fontSize.paragraph, 10) *
    parseFloat(p.theme.lineHeights.small)}px;
  position: absolute;
  bottom: 0;

  ${applyStyleModifiers(modifiers)};
`;

export default InputLabel;
