import { CustomTheme, Colors, Color } from '../../../../theme';

export default {
  border: (props: { theme: CustomTheme; type: keyof Colors }) => `
    background-color: #fff;
    border-width: 1px;
    border-color: ${
      (props.theme.colors[props.type || 'primary'] as Color).main
    };
  `
};
