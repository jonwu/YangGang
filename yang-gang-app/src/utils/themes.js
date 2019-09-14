import * as colors from "./colors";

const shared = {
  container: 1056,
  footnote: 10,
  small: 12,
  regular: 14,
  H5: 16,
  H4: 18,
  H3: 24,
  H2: 32,
  H1: 36,
  H0: 48,
  spacing_1: 24,
  spacing_2: 16,
  spacing_3: 12,
  spacing_4: 8,
  spacing_5: 4,
  separator: 1,
  borderWidth: 1,
  borderRadius: 4,
  red: colors.RED,
  yangRed: colors.YANG_RED,
  blue: colors.BLUE,
  yellow: colors.YELLOW,
  green: colors.GREEN,
  darkGreen: colors.DARK_GREEN,
  orange: colors.ORANGE,
  light: colors.LIGHT,
  dark: colors.DARK,
  yang: colors.YANG,
  activeOpacity: 1
};

const collections = {
  0: {
    id: 0,
    name: "Light Theme",
    text: colors.DARK,
    bg: colors.REDDIT_SLATE,
    bg2: colors.WHITE,
    bgTabs: colors.ROKA_SLATE,
    bgHeader: colors.YANG,
    borderColor: colors.DARK(0.1),
    cardShadow: colors.DARK(0.5),
    shadow: colors.DARK(0.1),
    loadingColor: colors.DARK(0.5),
    newsColor: colors.DARK_GREEN(),
    tweetLinkColor: colors.YANG,
    indicatorColor: colors.YANG(),
    fab: colors.RED(),
    ...shared
  },
  1: {
    id: 1,
    name: "Dark Theme",
    text: colors.LIGHT,
    bg2: colors.BLACK,
    bg: colors.REDDIT_DARK_SLATE,
    bgTabs: colors.BLACK,
    bgHeader: colors.BLACK,
    borderColor: colors.LIGHT(0.05),
    cardShadow: colors.LIGHT(0),
    shadow: colors.LIGHT(0.1),
    loadingColor: colors.LIGHT(0.5),
    newsColor: colors.GREEN(),
    tweetLinkColor: colors.BLUE,
    indicatorColor: colors.YANG_RED(),
    fab: colors.RED(),
    ...shared
  }
};

export default collections;
