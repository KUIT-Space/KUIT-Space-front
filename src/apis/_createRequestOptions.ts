export interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: BodyInit;
  headers?: HeadersInit;
  redirect?: RequestRedirect;
}

export const createRequestOptionsJSON = (
  method: RequestOptions["method"],
  body?: RequestOptions["body"],
): RequestOptions => {
  return {
    method: method,
    body: body,
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

// export const createRequestOptionsFORM = (  method: RequestOptions["method"],
//   body: RequestOptions["body"],
// ): RequestOptions => ({
//   method: method,
//   body: JSON.stringify(body),
//   redirect: "follow",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const createRequestOptionsFORM_AUTH = (
  method: RequestOptions["method"],
  body?: FormData,
) => {
  const token = localStorage.getItem("Authorization");

  return token
    ? ({
        method: method,
        body: body,
        redirect: "follow",
        headers: {
          Authorization: token,
        },
      } as RequestOptions)
    : null;
};

export const createRequestOptionsJSON_AUTH = (
  method: RequestOptions["method"],
  body?: RequestOptions["body"],
): RequestOptions | null => {
  const token = localStorage.getItem("Authorization");

  return token
    ? {
        method: method,
        body: body,
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    : null;
};

/** Generic fetch API
 *
 */
export const fetchApi = async <T>(url: string, options: RequestOptions): Promise<T> => {
  const response: T = await fetch(url, options)
    .then((res) => {
      // 401 Unauthorized 시 재로그인 요청
      if (res.status === 401) {
        alert("로그인이 필요합니다.");
      }

      return res.json();
    })
    .catch((err) => {
      console.error("[fetch error]", err);
      throw err;
    });

  return response;
};
