import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const DiscordLoginPage = () => {
  const navigate = useNavigate();

  const handleDiscordLogin = () => {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_DISCORD_REDIRECT_URI}&response_type=code&scope=identify%20email`;
    window.location.href = link;
  };

  useEffect(() => {
    const jwt = new URL(document.location.toString()).searchParams.get("jwt");
    const userId = new URL(document.location.toString()).searchParams.get("userId");
    console.log("jwt, userId", jwt, userId);

    if (jwt && userId) {
      localStorage.setItem("Authorization", jwt);
      localStorage.setItem("userId", userId);
      console.log("디스코드 로그인 성공");
      navigate("/space");
    }
  }, []);

  return (
    <>
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

        <LoginButton onClick={handleDiscordLogin}>
          <DiscordLogo>
            <img src={discordLogo} style={{ width: "100%" }} alt="Logo" />
          </DiscordLogo>
          디스코드 계정으로 로그인
        </LoginButton>
      </Container>
    </>
  );
};

export default DiscordLoginPage;
