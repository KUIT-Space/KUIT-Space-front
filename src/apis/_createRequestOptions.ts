export interface RequestOptions {
  method: "GET" | "POST";
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
