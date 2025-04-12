import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/posts", async ({ request }) => {
    const body = (await request.json()) as { title: string; content: string };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json({
      id: 1,
      title: body.title,
      content: body.content,
      author: {
        id: 1,
        name: "Test User",
      },
      createdAt: new Date().toISOString(),
    });
  }),
];
