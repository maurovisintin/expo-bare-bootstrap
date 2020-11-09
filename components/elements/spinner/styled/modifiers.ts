import { CustomTheme } from '../../../../theme';

export default {
  padded: (props: { theme: CustomTheme }) => `
    padding-vertical: ${props.theme.paddings.small};
  `
};
