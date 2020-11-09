import { CustomTheme, Fonts } from '../../../../theme';

export const calculateLineHeight = (fontSize: string, lineHeight: string) => {
  return parseInt(fontSize, 10) * parseFloat(lineHeight);
};

export default {
  light: (props: {
    theme: CustomTheme;
    fontSize: string;
    fontFamily: keyof Fonts;
  }) => `
    font-family: ${props.theme.fonts[props.fontFamily]}-light
  `,
  semibold: (props: {
    theme: CustomTheme;
    fontSize: string;
    fontFamily: keyof Fonts;
  }) => `
    font-family: ${props.theme.fonts[props.fontFamily]}-semibold
  `,
  bold: (props: {
    theme: CustomTheme;
    fontSize: string;
    fontFamily: keyof Fonts;
  }) => `
    font-family: ${props.theme.fonts[props.fontFamily]}-bold
  `,
  black: (props: {
    theme: CustomTheme;
    fontSize: string;
    fontFamily: keyof Fonts;
  }) => `
    font-family: ${props.theme.fonts[props.fontFamily]}-black
  `,
  smallHeight: (props: {
    theme: CustomTheme;
    fontSize: string;
    lineHeight: string;
  }) => `
    line-height: ${calculateLineHeight(
      props.fontSize || props.theme.fontSize.paragraph,
      props.theme.lineHeights.small
    )}px
  `,
  largeHeight: (props: {
    theme: CustomTheme;
    fontSize: string;
    lineHeight: string;
  }) => `
    line-height: ${calculateLineHeight(
      props.fontSize || props.theme.fontSize.paragraph,
      props.theme.lineHeights.large
    )}px
  `,
  centered: () => `
    text-align: center;
  `
};
