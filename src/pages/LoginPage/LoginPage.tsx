import React, { useState } from "react";
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
} from "@/pages/LoginPage/LoginPage.styled.ts";

const LoginPage = () => {
  const navigate = useNavigate();

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

        <LoginButton>
          <DiscordLogo>
            <img src={discordLogo} style={{ width: "100%" }} alt="Logo" />
          </DiscordLogo>
          디스코드 계정으로 로그인
        </LoginButton>
      </Container>
    </>
  );
};

export default LoginPage;
