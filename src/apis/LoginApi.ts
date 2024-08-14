import { createRequestOptionsJSON, RequestOptions } from "./_createRequestOptions";

const fetchLoginApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options)
    .then((res) => res.text())
    .catch((err) => console.error(err));

  //console.log(response);

  return response;
};

export const loginApi = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };

  const requestOptions = createRequestOptionsJSON("POST", JSON.stringify(body));
  const response = await fetchLoginApi("https://project-space.xyz/user/login", requestOptions);

  // Authorization token 응답에 포함되면 local storage에 저장
  if (response && response.token) {
    localStorage.setItem("Authorization", response.token);
  }

  return response;
};
