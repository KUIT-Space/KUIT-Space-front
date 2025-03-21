import React, { useState } from "react";

import { generateState, storeState } from "@/apis/oauth";
import discordLogo from "@/assets/Login/discordLogo.svg";
import star from "@/assets/Login/star.svg";
import logoSpace from "@/assets/logo_space.svg";
import {
  Container,
  Description,
  DiscordLogo,
  LoginButton,
  Logo,
  LogoContainer,
  Star,
} from "@/pages/LoginPage/DiscordLogin.styled";

const getDiscordConfig = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

  console.log("🔹 clientId:", clientId); // 🛠️ 디버깅 로그
  console.log("🔹 redirectUri:", redirectUri); // 🛠️ 디버깅 로그

  if (!clientId || !redirectUri) {
    console.error("❌ 환경 변수가 설정되지 않음! 배포 환경에서 확인 필요");
  }

  return { clientId, redirectUri };
};

const DiscordLoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleDiscordLogin = () => {
    console.log("🟢 handleDiscordLogin() 실행됨!");
    setLoading(true);

    const { clientId, redirectUri } = getDiscordConfig();

    if (!clientId || !redirectUri) {
      console.error("❌ OAuth 설정 오류: 환경 변수가 설정되지 않음");
      setLoading(false);
      return;
    }

    // Generate and store state parameter for CSRF protection
    const state = generateState();
    storeState(state);

    const SCOPE = "identify email";
    const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${SCOPE}&state=${state}`;

    console.log("🟢 생성된 디스코드 OAuth URL:", DISCORD_OAUTH_URL);
    window.location.href = DISCORD_OAUTH_URL;
  };

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
