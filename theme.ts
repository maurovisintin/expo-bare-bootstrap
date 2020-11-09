import { mix } from 'polished';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const REM = width / 375 <= 1.2 ? width / 375 : 1.2;

export type Paddings = {
  tiny: string;
  extraSmall: string;
  verySmall: string;
  small: string;
  normal: string;
  regular: string;
  large: string;
  extraLarge: string;
};

export type LineHeights = {
  extraSmall: string;
  small: string;
  regular: string;
  large: string;
};

export type Fonts = {
  sansSerif: string;
  'sansSerif-light': string;
  'sansSerif-semibold': string;
  'sansSerif-bold': string;
  serif: string;
  'serif-bold': string;
  'serif-black': string;
};

export type FontSize = {
  hero: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  paragraph: string;
  small: string;
  extrasmall: string;
  tiny: string;
};

export type Color = {
  main: string;
  disabled: string;
  focus: string;
};

export type Colors = {
  bgPrimary: string;
  bgSecondary: string;
  bgGray: string;
  primary: Color;
  contrast: Color;
  secondary: Color;
  ternary: Color;
  info: Color;
  warning: Color;
  success: Color;
  danger: Color;
  green: Color;
  fountainBlue: Color;
  red: Color;
  orange: Color;
  grayDarker: Color;
  grayDark: Color;
  gray: Color;
  grayLight: Color;
  grayLighter: Color;
  cyan: string;
  overlayRed: string;
  overlayGreen: string;
  yellow: string;
};

export type CheckboxesSize = {
  small: string;
  regular: string;
};

export type Checkboxes = {
  size: CheckboxesSize;
};

export type ButtonSize = {
  small: string;
  regular: string;
  large: string;
  huge: string;
};

export type IconSize = {
  extraSmall: string;
  small: string;
  logo: string;
  regular: string;
  large: string;
  huge: string;
};

export type Buttons = {
  height: ButtonSize;
  fontSize: ButtonSize;
  opacity: number;
};

export type CustomTheme = {
  buttons: Buttons;
  checkboxes: Checkboxes;
  colors: Colors;
  lineHeights: LineHeights;
  paddings: Paddings;
  iconSizes: IconSize;
  fonts: Fonts;
  fontSize: FontSize;
  rem: number;
};

const createColors = (colorHex: string) => {
  return {
    main: colorHex,
    disabled: mix(0.5, colorHex, 'rgb(255,255,255)'),
    focus: mix(0.5, colorHex, 'rgba(0,0,0,0.3)')
  };
};

const colors = {
  bgPrimary: '#fff',
  bgSecondary: '#e7c782',
  bgGray: '#f7f8f9',
  primary: createColors('#6F00FF'),
  contrast: createColors('#2D3778'),
  secondary: createColors('#6A4C69'),
  ternary: createColors('#34A3B3'),
  info: createColors('#F28F41'),
  warning: createColors('#F14B4C'),
  success: createColors('#B1D25A'),
  danger: createColors('#C70E02'),
  green: createColors('#3A702B'),
  fountainBlue: createColors('#6DAAB0'),
  red: createColors('#F04C4C'),
  orange: createColors('#ED7347'),
  grayDarker: createColors('#2F2F41'),
  grayDark: createColors('#62627A'),
  gray: createColors('#9696A9'),
  grayLight: createColors('#CACAD5'),
  grayLighter: createColors('#F3F3F3'),
  cyan: '#8EC3C8',
  overlayRed: '#FF6058',
  overlayGreen: '#28C940',
  yellow: '#FFAF3C'
};

const paddings = {
  tiny: `${4 * REM}px`,
  extraSmall: `${8 * REM}px`,
  verySmall: `${12 * REM}px`,
  small: `${16 * REM}px`,
  normal: `${20 * REM}px`,
  regular: `${24 * REM}px`,
  large: `${32 * REM}px`,
  extraLarge: `${48 * REM}px`
};

const lineHeights = {
  extraSmall: '1',
  small: '1.2',
  regular: '1.4',
  large: '2'
};

const iconSizes = {
  tiny: `${8 * REM}px`,
  extraSmall: `${12 * REM}px`,
  small: `${16 * REM}px`,
  logo: `${20 * REM}px`,
  regular: `${24 * REM}px`,
  large: `${33 * REM}px`,
  huge: `${50 * REM}px`
};

const theme: CustomTheme = {
  buttons: {
    height: {
      small: `${32 * REM}px`,
      regular: `${40 * REM}px`,
      large: `${48 * REM}px`,
      huge: `${60 * REM}px`
    },
    fontSize: {
      small: `12px`,
      regular: `14px`,
      large: `14px`,
      huge: `16px`
    },
    opacity: 0.6
  },
  checkboxes: {
    size: {
      small: `${14 * REM}px`, // + border
      regular: `${18 * REM}px` // + border
    }
  },
  colors,
  lineHeights,
  paddings,
  iconSizes,
  fonts: {
    sansSerif: 'proximaNova',
    'sansSerif-light': 'proximaNova-light',
    'sansSerif-semibold': 'proximaNova-semibold',
    'sansSerif-bold': 'proximaNova-bold',
    serif: 'playfairDisplay',
    'serif-bold': 'playfairDisplay-bold',
    'serif-black': 'playfairDisplay-black'
  },
  fontSize: {
    hero: `42px`,
    h1: `32px`,
    h2: `28px`,
    h3: `24px`,
    h4: `22px`,
    h5: `20px`,
    h6: `18px`,
    paragraph: `16px`,
    small: `14px`,
    extrasmall: `12px`,
    tiny: `10px`
  },
  rem: REM
};

export default theme;
