import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(id.trim() !== "" && password.trim() !== "");
  }, [id, password]);

  const handleLogin = () => {
    loginApi(id, password).then(res => navigate("/"));
  };

  return (
    <>
      <Container>
        <Logo>
          <img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
        </Logo>
        <Input
          type="id"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginTop: "10.37rem" }}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin} $isActive={isButtonActive}>
          로그인
        </LoginButton>
        <BtContainer>
          <Button>아이디 찾기</Button>
          <Button>비밀번호 찾기</Button>
          <Button onClick={() => navigate("/signup")}>회원가입</Button>
        </BtContainer>
        <ScContainer>
          <Social>
            <img src={kakao} alt="kakao" />
          </Social>
          <Social>
            <img src={google} alt="google" />
          </Social>
          <Social>
            <img src={naver} alt="naver" />
          </Social>
        </ScContainer>
      </Container>
    </>
  );
};

export default LoginPage;
