import { CustomTheme, Colors, Color } from '../../../../theme';

export default {
  checked: (props: { theme: CustomTheme; type: keyof Colors }) => `
    background-color: ${(props.theme.colors[props.type] as Color).main};
    border-color:  ${(props.theme.colors[props.type] as Color).main}
  `,
  small: () => `
    left: 4.5;
    top: 0.5;
    width: 4px;
    height: 9px;
  `
};
