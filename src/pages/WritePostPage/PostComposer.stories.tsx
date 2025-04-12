import type { Meta, StoryObj } from "@storybook/react";

import PostComposer from "./PostComposer";

const meta = {
  title: "Pages/WritePostPage/PostComposer",
  component: PostComposer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      // 스토리가 마운트되기 전에 초기화
      localStorage.clear();
      return <Story />;
    },
  ],
} satisfies Meta<typeof PostComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      localStorage.clear();
      return <Story />;
    },
  ],
};

export const WithPrefilledContent: Story = {
  decorators: [
    (Story) => {
      localStorage.clear();
      localStorage.setItem(
        "post-draft",
        JSON.stringify({
          title: "미리 작성된 제목",
          content: "미리 작성된 내용입니다.\n여러 줄로 작성할 수 있습니다.",
        }),
      );
      return <Story />;
    },
  ],
};

export const WithLongContent: Story = {
  decorators: [
    (Story) => {
      localStorage.clear();
      localStorage.setItem(
        "post-draft",
        JSON.stringify({
          title:
            "제목이 매우 길어서 200자에 거의 도달했을 때는 어떻게 보일까요? 이렇게 길게 작성하면 어떻게 보일까요? 이렇게 길게 작성하면 어떻게 보일까요? 이렇게 길게 작성하면 어떻게 보일까요? 이렇게 길게 작성하면 어떻게 보일까요? 이렇게 길게 작성하면 어떻게 보일까요?",
          content: "내용이 매우 길어서 1000자에 거의 도달했을 때는 어떻게 보일까요?".repeat(20),
        }),
      );
      return <Story />;
    },
  ],
};
