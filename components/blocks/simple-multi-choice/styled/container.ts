import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { CustomTheme } from '../../../../theme';

type Props = {
  modifiers?: string | string[];
};

const Container = styled.TouchableOpacity<Props>`
  background-color: ${p => p.theme.colors.bgGray};
  flex-direction: row;
  height: ${p => p.theme.buttons.height.huge};
  align-items: center;
  margin-vertical: 8px;
  padding-horizontal: ${p => p.theme.paddings.regular};
  border-radius: 10px;

  ${applyStyleModifiers({
    selected: (props: { theme: CustomTheme; type: string }) => `
      background-color: ${props.theme.colors.primary.main};
    `
  })};
`;

export default Container;
