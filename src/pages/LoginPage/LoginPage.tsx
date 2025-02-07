/* 카카오 로그인 버전
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

import { loginApi } from "@/apis";
import google from "@/assets/Login/icon_google.svg";
import kakao from "@/assets/Login/icon_kakao.svg";
import naver from "@/assets/Login/icon_naver.svg";
import logoSpace from "@/assets/logo_space.svg";
import {
  BtContainer,
  Button,
  Container,
  Input,
  LoginButton,
  Logo,
  ScContainer,
  Social,
} from "@/pages/LoginPage/LoginPage.styled.ts";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return re.test(password);
  };

  useEffect(() => {
    const isValid = validateEmail(email) && validatePassword(password);
    setIsButtonActive(isValid);
  }, [email, password]);

  const handleLogin = async () => {
    if (!isButtonActive) return;
    loginApi(email, password).then((res) =>
      res.status === "OK" ? navigate("/space") : alert("login error: " + res.message),
    );
  };

  const handleKakaoLogin = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_API_REST_API}&redirect_uri=${import.meta.env.VITE_API_REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  useEffect(() => {
    const jwt = new URL(document.location.toString()).searchParams.get("jwt");
    const userId = new URL(document.location.toString()).searchParams.get("userId");
    console.log("jwt, userId", jwt, userId);

    if (jwt && userId) {
      localStorage.setItem("Authorization", jwt);
      localStorage.setItem("userId", userId);
      console.log("카카오 로그인 성공");
      navigate("/space");
    }
  }, []);

  return (
    <>
      <Container>
        <Logo>
          <img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
        </Logo>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "10.37rem" }}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <LoginButton $isActive={isButtonActive} onClick={handleLogin}>
          로그인
        </LoginButton>
        <BtContainer>
          <Button>아이디 찾기</Button>
          <Button>비밀번호 찾기</Button>
          <Button onClick={() => navigate("/signup")}>회원가입</Button>
        </BtContainer>
        <ScContainer>
          <Social onClick={handleKakaoLogin}>
            <img src={kakao} alt="kakao" />
          </Social>
          <Social style={{ opacity: 0.5, cursor: "default" }} disabled>
            <img src={google} alt="google" />
          </Social>
          <Social style={{ opacity: 0.5, cursor: "default" }} disabled>
            <img src={naver} alt="naver" />
          </Social>
        </ScContainer>
      </Container>
    </>
  );
};

export default LoginPage;
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSpace from "@/assets/logo_space.svg";
import discordLogo from "@/assets/Login/discordLogo.svg";

import {
  Container,
  Logo,
  Dot,
  LogoContainer,
  Description,
  LoginButton,
  DiscordLogo,
} from "@/pages/LoginPage/LoginPage.styled.ts";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleDiscordLogin = () => {
    {
      /**/
    }
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <Logo>
            <img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
          </Logo>

          <Dot size={0.15625} top={0.65} left={7.19}>
            <circle cx="1.25" cy="1.25" r="1.25" fill="white" />
          </Dot>
          <Dot size={0.109} top={1.56} left={8.41}>
            <circle cx="1.40047" cy="1.41072" r="0.872145" fill="white" />
          </Dot>
          <Dot size={0.109} top={2.1} left={19.4}>
            <circle cx="1.04988" cy="1.13191" r="0.872145" fill="white" />
          </Dot>
          <Dot size={0.08719} top={2.7} left={20.8}>
            <circle cx="0.72506" cy="1.55123" r="0.697716" fill="white" />
          </Dot>
          <Dot size={0.08719} top={1.92} left={4.06}>
            <circle cx="1.62838" cy="0.992149" r="0.697716" fill="white" />
          </Dot>
          <Dot size={0.15263} top={2.44} left={17.5}>
            <circle cx="1.69854" cy="1.888" r="1.221" fill="white" />
          </Dot>
          <Dot size={0.08719} top={2.92} left={15}>
            <circle cx="1.27877" cy="1.03902" r="0.697716" fill="white" />
          </Dot>
          <Dot size={0.0545} top={1.38} left={19}>
            <circle cx="0.811072" cy="1.18363" r="0.436072" fill="white" />
          </Dot>
          <Dot size={0.04363} top={2.3} left={9.49}>
            <circle cx="1.14573" cy="0.748272" r="0.348858" fill="white" />
          </Dot>
          <Dot size={0.04363} top={0} left={13.8}>
            <circle cx="0.917217" cy="0.943585" r="0.348858" fill="white" />
          </Dot>
          <Dot size={0.04363} top={0.65} left={0}>
            <circle cx="0.348858" cy="0.348858" r="0.348858" fill="white" />
          </Dot>
          <Dot size={0.05581} top={2.85} left={3.67}>
            <circle cx="1.12703" cy="0.570877" r="0.446365" fill="white" />
          </Dot>
          <Dot size={0.05581} top={10.2} left={15.9}>
            <circle cx="0.528396" cy="0.708084" r="0.446365" fill="white" />
          </Dot>
          <Dot size={0.04363} top={4.59} left={1.81}>
            <circle cx="0.348858" cy="0.348858" r="0.348858" fill="white" />
          </Dot>
          <Dot size={0.04363} top={5.46} left={19.9}>
            <circle cx="0.348858" cy="0.348858" r="0.348858" fill="white" />
          </Dot>
        </LogoContainer>

        <Description>
          단 하나의 동아리/팀
          <br />
          프로젝트 커뮤니티
        </Description>

        <LoginButton onClick={handleDiscordLogin}>
          <>
            <DiscordLogo>
              <img src={discordLogo} style={{ width: "100%" }} alt="Logo" />
            </DiscordLogo>
            디스코드 계정으로 로그인
          </>
        </LoginButton>
      </Container>
    </>
  );
};

export default LoginPage;
