import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";

import BoardRegisterPage from "@/pages/BoardPage/BoardRegisterPage/BoardRegisterPage";

const meta = {
  title: "pages/BoardRegisterPage",
  component: BoardRegisterPage,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {
          spaceId: "1",
          boardId: "1",
        },
      },
      routing: {
        path: "/space/:spaceId/board/:boardId/post/create",
      },
    }),
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} as Meta<typeof BoardRegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// 인터랙션 스토리 1: 제목 필드 비어있음
export const EmptyTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 내용 필드에 텍스트 입력
    const contentInput = canvas.getByPlaceholderText(/내용/);
    await userEvent.type(contentInput, "테스트 내용입니다.");

    // 등록 버튼 비활성화 확인
    const submitButton = canvas.getByRole("button", { name: "등록" });
    await expect(submitButton).toBeDisabled();
  },
};

// 인터랙션 스토리 2: 내용 필드 비어있음
export const EmptyContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 제목 필드에 텍스트 입력
    const titleInput = canvas.getByPlaceholderText(/제목/);
    await userEvent.type(titleInput, "테스트 제목입니다.");

    // 등록 버튼 비활성화 확인
    const submitButton = canvas.getByRole("button", { name: "등록" });
    await expect(submitButton).toBeDisabled();
  },
};

// 인터랙션 스토리 3: 길이 제한 테스트
export const LengthLimit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 제목에 100자 이상 입력 시도
    const titleInput = canvas.getByPlaceholderText(/제목/);
    const longTitle = "a".repeat(101);
    await userEvent.type(titleInput, longTitle);

    // 100자에서 멈추는지 확인
    await expect(titleInput).toHaveValue("a".repeat(100));

    // 내용에 2000자 이상 입력 시도
    const contentInput = canvas.getByPlaceholderText(/내용/);
    const longContent = "b".repeat(2001);
    await userEvent.type(contentInput, longContent);

    // 2000자에서 멈추는지 확인
    await expect(contentInput).toHaveValue("b".repeat(2000));
  },
};

// 인터랙션 스토리 4: 정상 입력시 버튼 활성화
export const ValidInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 제목에 적절한 길이의 텍스트 입력
    const titleInput = canvas.getByPlaceholderText(/제목/);
    await userEvent.type(titleInput, "테스트 제목입니다.");

    // 내용에 적절한 길이의 텍스트 입력
    const contentInput = canvas.getByPlaceholderText(/내용/);
    await userEvent.type(contentInput, "테스트 내용입니다.");

    // 등록 버튼 활성화 확인
    const submitButton = canvas.getByRole("button", { name: "등록" });

    expect(submitButton).not.toBeDisabled();
  },
};
