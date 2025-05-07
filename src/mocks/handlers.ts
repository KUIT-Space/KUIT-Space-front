import { http, HttpResponse } from "msw";

interface PostCreateRequest {
  title: string;
  content: string;
  isAnonymous?: boolean;
  attachments?: File[];
}

export const handlers = [
  http.post("/space/:spaceId/board/:boardId/post", async ({ request, params }) => {
    const body = (await request.json()) as PostCreateRequest;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate required fields
    if (!body.title || !body.content) {
      return HttpResponse.json(
        {
          code: 11001,
          status: 400,
          message: "게시글 생성 요청에서 잘못된 값이 존재합니다.",
        },
        { status: 400 },
      );
    }

    // Validate title length (assuming max 100 characters)
    if (body.title.length > 100) {
      return HttpResponse.json(
        {
          code: 11001,
          status: 400,
          message: "게시글 생성 요청에서 잘못된 값이 존재합니다.",
        },
        { status: 400 },
      );
    }

    // Validate content length (assuming max 2000 characters)
    if (body.content.length > 2000) {
      return HttpResponse.json(
        {
          code: 11001,
          status: 400,
          message: "게시글 생성 요청에서 잘못된 값이 존재합니다.",
        },
        { status: 400 },
      );
    }

    // Success response
    return HttpResponse.json(
      {
        code: 1000,
        status: 200,
        message: "요청에 성공하였습니다.",
        result: 1, // Mock post ID
      },
      { status: 200 },
    );
  }),
];
