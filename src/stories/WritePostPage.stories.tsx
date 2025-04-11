import { Meta, StoryObj } from "@storybook/react";

import WritePostPage from "../pages/WritePostPage";

const meta = {
  title: "Pages/WritePostPage",
  component: WritePostPage,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WritePostPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
