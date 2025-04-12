import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";
import type { Preview } from "@storybook/react";
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/Theme";
import GlobalStyle from "../src/styles/GlobalStyles";
import "../src/index.css";
import { withRouter } from "storybook-addon-remix-react-router";
import { QueryProvider } from "../src/apis/query-provider";
import GlobalErrorFallback from "../src/components/GlobalErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import SkeletonDetailPage from "../src/components/SkeletonDetailPage";
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
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            <Suspense fallback={<SkeletonDetailPage />}>
              <Story />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </QueryProvider>
    ),
    withRouter,
  ],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
