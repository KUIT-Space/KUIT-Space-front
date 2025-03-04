import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logoSpace from "@/assets/logo_space.svg";
import discordLogo from "@/assets/Login/discordLogo.svg";
import star from "@/assets/Login/star.svg";

import {
  Container,
  Logo,
  LogoContainer,
  Description,
  LoginButton,
  DiscordLogo,
  Star,
} from "@/pages/LoginPage/DiscordLogin.styled";

const getDiscordConfig = () => {
  const clientId = "1331873954553532486";
  const redirectUri = "http://localhost:5173/KUIT-Space-front/discord-oauth"; //배포Uri도 추가할게요!

  return { clientId, redirectUri };
};

const DiscordLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleDiscordLogin = () => {
    const { clientId, redirectUri } = getDiscordConfig();
    const SCOPE = "identify email";

    const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${SCOPE}`;

    console.log("디스코드 OAuth URL:", DISCORD_OAUTH_URL);
    window.location.href = DISCORD_OAUTH_URL;
  };

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("받은 `code` 값:", code);

    if (!code) {
      return;
    }

    setLoading(true);
    const BACKEND_TOKEN_URL = `http://13.125.180.149:8080/oauth/discord?code=${code}`;
    console.log("백엔드로 보낼 요청:", BACKEND_TOKEN_URL);

    fetch(BACKEND_TOKEN_URL, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드 응답 데이터:", data);
        if (data.status === 200 && data.result) {
          localStorage.setItem("Authorization", data.jwt || "");
          localStorage.setItem("userId", data.userId || "");
          console.log("디스코드 로그인 성공, JWT 저장 완료");
          navigate("/space");
        } else {
          console.error("서버 응답이 정상적이지 않음:", data);
        }
      })
      .catch((err) => console.error("디스코드 로그인 실패:", err))
      .finally(() => setLoading(false));
  }, [searchParams, navigate]);

  return (
    <Container>
      <LogoContainer>
        <Logo>
          <img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
        </Logo>
        <Star>
          <img src={star} alt="Star" />
        </Star>
      </LogoContainer>

      <Description>
        단 하나의 동아리/팀
        <br />
        프로젝트 커뮤니티
      </Description>

      <LoginButton onClick={handleDiscordLogin} disabled={loading}>
        <DiscordLogo>
          <img src={discordLogo} style={{ width: "100%" }} alt="Logo" />
        </DiscordLogo>
        {loading ? "로그인 중..." : "디스코드 계정으로 로그인"}
      </LoginButton>
    </Container>
  );
};

export default DiscordLoginPage;
