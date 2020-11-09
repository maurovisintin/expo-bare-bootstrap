import { CustomTheme } from '../../../../theme';

export default {
  visible: (props: { theme: CustomTheme }) => `
     background-color: ${props.theme.colors.primary.main};
  `
};
