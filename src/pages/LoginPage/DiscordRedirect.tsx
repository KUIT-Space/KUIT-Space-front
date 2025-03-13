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
      console.error("❌ code 값이 없음!");
      return;
    }

    const BACKEND_TOKEN_URL = `${import.meta.env.VITE_API_BACK_URL}/oauth/discord?code=${code}`;
    console.log("백엔드로 보낼 요청:", BACKEND_TOKEN_URL);

    fetch(BACKEND_TOKEN_URL, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ 백엔드 응답 데이터:", data);

        if (!data?.result) {
          console.error("❌ 올바르지 않은 응답 데이터:", data);
          return;
        }

        if (data.status === 200 || data.status === "OK") {
          if (data.result.success) {
            console.log("✅ 로그인 성공!");
            navigate("/space");
          } else {
            console.error("❌ 로그인 실패: result.success 값이 false임.");
          }
        } else {
          console.error("❌ 백엔드 응답 오류, status 값:", data.status);
        }
      })
      .catch((err) => console.error("❌ 디스코드 로그인 실패:", err));
  }, [searchParams, navigate]);

  return <div>디스코드 로그인 처리 중입니다...</div>;
};

export default OAuthRedirect;
