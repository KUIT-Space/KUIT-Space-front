import { createRequestOptionsJSON, RequestOptions } from "./_createRequestOptions";

const fetchLoginApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options)
    .then((res) => res)
    .catch((err) => console.error("[fetch error]", err));
  //.then((res) => {localStorage.setItem("Authorization", res.headers.get("Authorization");})
  return response;
};

export const loginApi = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  const requestOptions = createRequestOptionsJSON("POST", JSON.stringify(body));
  const response = await fetchLoginApi("/api/user/login", requestOptions);

  // Authorization token 응답에 포함되면 local storage에 저장
  const token = response?.headers.get("Authrization");
  console.log(response?.json());
  console.log(token);
  if (response && token) {
    localStorage.setItem("Authorization", token);
  }

  return response;
};
