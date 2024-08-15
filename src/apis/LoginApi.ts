import { createRequestOptionsJSON, RequestOptions } from "./_createRequestOptions";

const fetchLoginApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options)
    .then((res) => {
      // Authorization token 응답에 포함되면 local storage에 저장
      localStorage.setItem("Authorization", res.headers.get("Authorization") ?? "");
      return res.json;
    })
    .catch((err) => console.error("[fetch error]", err));

  return response;
};

export const loginApi = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };
  const requestOptions = createRequestOptionsJSON("POST", JSON.stringify(body));

  return await fetchLoginApi("/api/user/login", requestOptions);
};
