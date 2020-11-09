import { CustomTheme } from '../../../../theme';

export default {
  centered: () => `
    justify-content: center;
    align-items: center;
  `,
  padded: (props: { theme: CustomTheme }) => `
    padding-horizontal: ${props.theme.paddings.regular};
    padding-top: 0px;
    padding-bottom: ${props.theme.paddings.small};
  `,
  flexEnd: (props: { theme: CustomTheme }) => `
  align-items: flex-end;
  `,
  paddedHorizontal: (props: { theme: CustomTheme }) => `
  padding-horizontal: ${props.theme.paddings.regular};
  `
};
