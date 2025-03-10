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
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error(
      "❌ 환경 변수(`VITE_DISCORD_CLIENT_ID`, `VITE_DISCORD_REDIRECT_URI`)가 설정되지 않음!",
    );
  }

  return { clientId, redirectUri };
};

const DiscordLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleDiscordLogin = () => {
    console.log("🟢 handleDiscordLogin() 실행됨!");

    const { clientId, redirectUri } = getDiscordConfig();

    if (!clientId || !redirectUri) {
      console.error("❌ OAuth 설정 오류: 환경 변수가 설정되지 않음");
      return;
    }

    const SCOPE = "identify email";
    const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${SCOPE}`;

    console.log("🟢 생성된 디스코드 OAuth URL:", DISCORD_OAUTH_URL);
    window.location.href = DISCORD_OAUTH_URL;
  };

  useEffect(() => {
    console.log("🟢 useEffect 실행됨!");
    const code = searchParams.get("code");
    console.log("🟢 받은 `code` 값:", code);

    if (!code) {
      console.error("❌ code 값이 없음!");
      return;
    }

    setLoading(true);
    const BACKEND_TOKEN_URL = `${import.meta.env.VITE_API_BACK_URL}/oauth/discord?code=${code}`;
    console.log("🟢 백엔드로 보낼 요청:", BACKEND_TOKEN_URL);

    fetch(BACKEND_TOKEN_URL, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("🟢 백엔드 응답 데이터:", data);

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
      .catch((err) => console.error("❌ 디스코드 로그인 실패:", err))
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
