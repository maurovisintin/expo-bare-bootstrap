import { CustomTheme } from '../../../../theme';

export default {
  active: (props: { theme: CustomTheme }) => `
    font-size: ${props.theme.fontSize.small};
    transform: translateY(-25px);
  `,
  disabled: (props: { theme: CustomTheme }) => `
    color: ${props.theme.colors.gray.disabled};
    border-color: ${props.theme.colors.gray.disabled};
  `,
  error: (props: { theme: CustomTheme }) => `
    color: ${props.theme.colors.warning.main};
    border-color: ${props.theme.colors.warning.main};
  `,
  focus: (props: { theme: CustomTheme }) => `
    color: ${props.theme.colors.primary.main};
  `
};
