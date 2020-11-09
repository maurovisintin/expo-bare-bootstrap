import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { CustomTheme } from '../../../../theme';

type Props = {
  modifiers?: any;
  theme: CustomTheme;
};

const InputContainer = styled.View<Props>`
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-color: ${p => p.theme.colors.gray.main};
  padding-bottom: 5px;
  min-height: ${p => p.theme.buttons.height.large};
  padding-right: 5px;

  ${applyStyleModifiers({
    error: (props: { theme: CustomTheme }) => `
      color: ${props.theme.colors.warning.main};
      border-color: ${props.theme.colors.warning.main};
      margin-bottom: 40px;
    `,
    focus: (props: { theme: CustomTheme }) => `
      border-color: ${props.theme.colors.primary.main};
    `,
    disabled: (props: { theme: CustomTheme }) => `
      border-color: ${props.theme.colors.gray.disabled};
    `
  })};
`;

export default InputContainer;
