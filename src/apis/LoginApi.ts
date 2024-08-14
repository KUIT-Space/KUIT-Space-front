import { createRequestOptionsJSON, RequestOptions } from "./_createRequestOptions";

const fetchLoginApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("[fetch error]", err));

  //console.log(response);

  return response;
};

export const loginApi = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  const requestOptions = createRequestOptionsJSON("POST", JSON.stringify(body));
  const response = await fetchLoginApi("/api/user/login", requestOptions);

  const res = await fetchLoginApi(
    `${import.meta.env.VITE_API_BACK_URL}/user/login`,
    requestOptions,
  );
  console.log(res);

  // Authorization token 응답에 포함되면 local storage에 저장
  console.log(response);
  if (response && response.token) {
    localStorage.setItem("Authorization", response.token);
  }

  return response;
};
