import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { kakaoLoginApi } from "@/apis";

const KakaoRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    kakaoLoginApi(code ?? "").then((res) => {
      console.log(res);
      navigate("/");
    });
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoRedirection;
