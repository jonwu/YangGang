import * as colors from './colors';

const shared = {
  container: '1056px',
  footnote: '10px',
  small: '12px',
  regular: '14px',
  H5: '16px',
  H4: '18px',
  H3: '24px',
  H2: '32px',
  H1: '36px',
  H0: '48px',
  spacing_1: '24px',
  spacing_2: '16px',
  spacing_3: '12px',
  spacing_4: '8px',
  spacing_5: '4px',
  separator: '1px',
  borderWidth: '1px',
  borderRadius: '4px',
  red: colors.RED,
  blue: colors.BLUE,
  yellow: colors.YELLOW,
  green: colors.GREEN,
  orange: colors.ORANGE,
  light: colors.LIGHT,
  dark: colors.DARK,
};

const collections = {
  0: {
    id: 0,
    name: 'Light Theme',
    text: colors.DARK,
    bg: colors.ROKA_SLATE,
    bg2: colors.WHITE,
    borderColor: colors.DARK(0.1),
    shadow: colors.DARK(0.1),
    ...shared,
  },
  1: {
    id: 1,
    name: 'Dark Theme',
    text: colors.LIGHT,
    bg: colors.ONYX_EXTRA_SLATE,
    bg2: colors.ONYX_SLATE,
    borderColor: colors.LIGHT(0.05),
    shadow: colors.LIGHT(0.1),
    ...shared,
  },
};

export default collections;
