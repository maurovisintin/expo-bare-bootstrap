import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import modifiers, { calculateLineHeight } from './modifiers';
import { Fonts } from '../../../../theme';

type Props = {
  fontSize: string;
  color: string;
  fontWeight: string;
  fontFamily: keyof Fonts;
  lineHeight: string;
  letterSpacing?: number;
};

const StyledText = styled.Text<Props>`
  color: ${p => p.color || p.theme.colors.grayDarker.main};
  font-family: ${p => p.theme.fonts[p.fontFamily] || p.theme.fonts.sansSerif};
  font-size: ${p => p.fontSize || p.theme.fontSize.paragraph};
  line-height: ${p =>
    calculateLineHeight(
      p.fontSize || p.theme.fontSize.paragraph,
      p.lineHeight || p.theme.lineHeights.regular
    )}px;
  letter-spacing: ${p => p.letterSpacing || 0}px;
  ${applyStyleModifiers(modifiers)};
`;
export default StyledText;
