import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { expect } from "@storybook/test";

import Tag from "../pages/WritePostPage/Tag";
import { theme } from "../styles/Theme";

const meta = {
  title: "Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isSelected: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "태그",
    isSelected: false,
  },
};

export const Android: Story = {
  args: {
    children: "안드로이드",
    isSelected: false,
  },
};

export const IOS: Story = {
  args: {
    children: "iOS",
    isSelected: false,
  },
};

export const Backend: Story = {
  args: {
    children: "서버",
    isSelected: false,
  },
};

export const Frontend: Story = {
  args: {
    children: "웹",
    isSelected: false,
  },
};

export const PM: Story = {
  args: {
    children: "PM",
    isSelected: false,
  },
};

export const Design: Story = {
  args: {
    children: "디자인",
    isSelected: false,
  },
};

export const SelectedDefault: Story = {
  args: {
    children: "태그",
    isSelected: true,
  },
};

export const SelectedAndroid: Story = {
  args: {
    children: "안드로이드",
    isSelected: true,
  },
};

export const SelectedIOS: Story = {
  args: {
    children: "iOS",
    isSelected: true,
  },
};

export const SelectedBackend: Story = {
  args: {
    children: "서버",
    isSelected: true,
  },
};

export const SelectedFrontend: Story = {
  args: {
    children: "웹",
    isSelected: true,
  },
};

export const SelectedPM: Story = {
  args: {
    children: "PM",
    isSelected: true,
  },
};

export const SelectedDesign: Story = {
  args: {
    children: "디자인",
    isSelected: true,
  },
};

const InteractiveTag = ({ children }: { children: React.ReactNode }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Tag isSelected={isSelected} onToggle={() => setIsSelected(!isSelected)}>
      {children}
    </Tag>
  );
};

export const InteractiveDefault: Story = {
  args: {
    children: "태그",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractiveAndroid: Story = {
  args: {
    children: "안드로이드",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractiveIOS: Story = {
  args: {
    children: "iOS",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractiveBackend: Story = {
  args: {
    children: "서버",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractiveFrontend: Story = {
  args: {
    children: "웹",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractivePM: Story = {
  args: {
    children: "PM",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};

export const InteractiveDesign: Story = {
  args: {
    children: "디자인",
  },
  render: ({ children }) => <InteractiveTag>{children}</InteractiveTag>,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: args.children as string });

    // 초기 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });

    // 첫 번째 클릭
    await userEvent.click(tag);
    // 클릭 후 상태 확인 (선택)
    await expect(tag).not.toHaveStyle({ "background-color": theme.colors.BG850 });

    // 두 번째 클릭
    await userEvent.click(tag);
    // 다시 클릭 후 상태 확인 (미선택)
    await expect(tag).toHaveStyle({ "background-color": theme.colors.BG850 });
  },
};
