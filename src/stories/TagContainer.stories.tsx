import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import TagContainer from "../pages/WritePostPage/TagContainer";
import { theme } from "../styles/Theme";

const tagTitles = ["안드로이드", "iOS", "서버", "웹", "PM", "디자인"];

const meta = {
  title: "Components/TagContainer",
  component: TagContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TagContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagTitles: tagTitles,
  },
};

export const ClickInteraction: Story = {
  args: {
    tagTitles: tagTitles,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First tag click
    const androidButton = canvas.getByRole("button", { name: "안드로이드" });
    // 초기 상태 확인 (미선택)
    await expect(androidButton).toHaveStyle({ "background-color": theme.colors.BG850 });
    await userEvent.click(androidButton);
    // 클릭 후 상태 확인 (선택)
    await expect(androidButton).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // Second tag click
    const iOSButton = canvas.getByRole("button", { name: "iOS" });
    // 초기 상태 확인 (미선택)
    await expect(iOSButton).toHaveStyle({ "background-color": theme.colors.BG850 });
    await userEvent.click(iOSButton);
    // 클릭 후 상태 확인 (선택)
    await expect(iOSButton).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // Third tag click
    const serverButton = canvas.getByRole("button", { name: "서버" });
    // 초기 상태 확인 (미선택)
    await expect(serverButton).toHaveStyle({ "background-color": theme.colors.BG850 });
    await userEvent.click(serverButton);
    // 클릭 후 상태 확인 (선택)
    await expect(serverButton).not.toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};
