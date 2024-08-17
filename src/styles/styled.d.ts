// theme.d.ts
import { colorsTypes, fontSizeTypes, windowSizeTypes } from "@/styles/Theme";

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    windowSize: windowSizeTypes;
    fontSize: fontSizeTypes;
    colors: colorsTypes;
  }
}
