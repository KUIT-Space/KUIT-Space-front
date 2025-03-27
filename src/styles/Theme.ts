import { DefaultTheme } from "styled-components";

const windowSize = {
  small: "screen and (max-width: 450px)",
  base: "screen and (max-width: 768px)",
  large: "screen and (max-width: 1024px)",
};

const fontSize = {
  xs: "0.5rem",
  sm: "0.75rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
};

const colors = {
  BG900: "#171719",
  BG850: "#1B1B1D",
  BG800: "#222226",
  BG700: "#303036",
  BG600: "#45454B",
  BG500: "#767681",
  BG400: "#ACACB5",
  BG300: "#D4D4D9",
  BG200: "#EFEFF0",
  white: "#FFFFFF",
  light: "#EDFFF8",
  light_hover: "#E4FFF5",
  light_active: "#C6FFEB",
  normal: "#48FFBD",
  normal_hover: "#41E6AA",
  normal_active: "#3ACC97",
  dark: "#36BF8E",
  dark_hover: "#2B9971",
  dark_active: "#207355",
  darker: "#195942",
  char_orange: "#FD7D15",
  char_yellow: "#FEEE5A",
  char_blue: "#5AD7FE",
  char_pink: "#F994FB",
  char_lime: "#5AFE7E",
  char_red: "#FF5656",
};

export type windowSizeTypes = typeof windowSize;
export type fontSizeTypes = typeof fontSize;
export type colorsTypes = typeof colors;

export const theme: DefaultTheme = {
  windowSize,
  fontSize,
  colors,
};
