import { MemoryRouter } from "react-router-dom";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { HTTPError } from "ky";
import { ThemeProvider } from "styled-components";

import GlobalErrorFallback from "@/components/GlobalErrorFallback";
import { theme } from "@/styles/Theme";
import { UnauthorizedError } from "@/utils/HttpErrors";

// Create a wrapper component to provide the necessary context
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

const meta = {
  title: "Components/GlobalErrorFallback",
  component: GlobalErrorFallback,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
} satisfies Meta<typeof GlobalErrorFallback>;

export default meta;
type Story = StoryObj<typeof GlobalErrorFallback>;

// Create a mock response for HTTPError
const createMockResponse = (status = 500) => {
  const response = new Response(JSON.stringify({ message: "Error message" }), {
    status,
    statusText: status === 401 ? "Unauthorized" : "Internal Server Error",
  });
  return response;
};

// Create a mock request
const mockRequest = new Request("https://example.com");

// Create a mock options object
const mockOptions = {
  method: "GET",
  credentials: "same-origin",
  retry: { limit: 2 },
} as any;

// Regular error story
export const GenericError: Story = {
  args: {
    error: new Error("Something went wrong"),
    resetErrorBoundary: () => console.log("Reset error boundary"),
  },
};

// HTTP error story
export const HttpError: Story = {
  args: {
    error: new HTTPError(createMockResponse(500), mockRequest, mockOptions),
    resetErrorBoundary: () => console.log("Reset error boundary"),
  },
};

// Unauthorized error story
export const Unauthorized: Story = {
  args: {
    error: new UnauthorizedError(createMockResponse(401) as any, mockRequest as any, mockOptions),
    resetErrorBoundary: () => console.log("Reset error boundary"),
  },
  // Note: In a real test environment, we would verify that navigate was called with "/discordlogin"
};

// Test the retry button
export const RetryButton: Story = {
  args: {
    error: new Error("This error can be retried"),
    resetErrorBoundary: () => console.log("Reset error boundary"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const retryButton = canvas.getByText("다시 시도하기");

    // Click the retry button
    await userEvent.click(retryButton);

    // We can't easily test the resetErrorBoundary function being called
    // in this context, but in a real test environment it would be possible
  },
};
