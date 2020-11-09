import { CustomTheme, Colors, Color } from '../../../../theme';

export default {
  disabled: (props: { theme: CustomTheme; type: keyof Colors }) => `
    background-color: ${(props.theme.colors[props.type] as Color).disabled};
  `
};
