import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthRedirect = () => {
  console.log("OAuthRedirect.tsx 실행");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("받은 `code` 값:", code);

    if (!code) {
      console.error("code 값이 없음");
      return;
    }

    // ✅ 백엔드로 code 전달
    const BACKEND_TOKEN_URL = `http://13.125.180.149:8080/oauth/discord?code=${code}`;
    console.log("백엔드로 보낼 요청:", BACKEND_TOKEN_URL);

    fetch(BACKEND_TOKEN_URL, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드 응답 데이터:", data);
        if (data.status === 200 && data.result) {
          localStorage.setItem("Authorization", data.result.jwt || "");
          localStorage.setItem("userId", data.result.userId || "");
          console.log("디스코드 로그인 성공, JWT 저장 완료");
          navigate("/space");
        } else {
          console.error("서버 응답이 정상적이지 않음:", data);
        }
      })
      .catch((err) => console.error("디스코드 로그인 실패:", err));
  }, [searchParams, navigate]);

  return <div>디스코드 로그인 처리 중입니다...</div>;
};

export default OAuthRedirect;
