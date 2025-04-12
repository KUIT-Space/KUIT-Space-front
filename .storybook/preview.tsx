import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";
import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/Theme";
import GlobalStyle from "../src/styles/GlobalStyles";
import "../src/index.css";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    msw: {
      handlers: handlers,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
