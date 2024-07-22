// theme.d.ts
import "styled-components";
import { windowSizeTypes, fontSizeTypes, colorsTypes } from "./Theme";

declare module "styled-components" {
	export interface DefaultTheme {
		windowSize: windowSizeTypes;
		fontSize: fontSizeTypes;
		colors: colorsTypes;
	}
}
