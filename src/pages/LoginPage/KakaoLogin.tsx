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
} from "@/pages/LoginPage/KakaoLogin.styled.ts";

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
