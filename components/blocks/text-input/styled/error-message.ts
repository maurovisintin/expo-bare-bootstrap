import styled from 'styled-components/native';

import Text from '../../../elements/text';

const ErrorMessage = styled(Text)`
  font-size: ${p => p.theme.fontSize.small};
  font-family: ${p => p.theme.fonts.sansSerif}-semibold;
  line-height: ${p =>
    parseInt(p.theme.fontSize.small, 10) *
    parseFloat(p.theme.lineHeights.regular)}px;
  color: ${p => p.theme.colors.warning.main};
  position: absolute;
  bottom: -30px;
`;

export default ErrorMessage;
