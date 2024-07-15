// theme.d.ts
import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		windowSize: {
			small: string;
			base: string;
			large: string;
		};
		fontSize: {
			xs: string;
			sm: string;
			base: string;
			md: string;
			lg: string;
		};
		colors: {
			BG900: string;
			BG850: string;
			BG800: string;
			BG700: string;
			BG600: string;
			BG500: string;
			BG400: string;
			BG300: string;
			BG200: string;
			white: string;
			light: string;
			light_hover: string;
			light_active: string;
			normal: string;
			normal_hover: string;
			normal_active: string;
			dark: string;
			dark_hover: string;
			dark_active: string;
			darker: string;
			char_orange: string;
			char_yellow: string;
			char_blue: string;
			char_pink: string;
			char_lime: string;
			char_red: string;
		};
	}
}
