import styled, { createGlobalStyle, DefaultTheme } from "styled-components";
import logoSpace from '@/assets/logo_space.svg';
import kakao from '@/assets/Login/icon_kakao.svg';
import google from '@/assets/Login/icon_google.svg';
import naver from '@/assets/Login/icon_naver.svg';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  display: flex;
  margin: 160px auto 0 auto;
  width: 140px;
`;

const Input = styled.input`
  display: flex;
  width: 320px;
  height: 52px;
  border-radius: 12px;
  padding: 15px;
  padding-left: 16px;
  border: 1px solid transparent;
  background-color: #222226;
  font-family: Freesentation;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.64px;
  color: #FFFFFF;
  caret-color: #48FFBD;

  &::placeholder {
    color: #767681;
  }

  &:focus {
    border-color: #48FFBD;
    outline: none;
  }
`;

interface LoginButtonProps {
  isActive: boolean;
}

const LoginButton = styled.button<LoginButtonProps>`
  display: flex;
  width: 320px;
  height: 52px;
  padding: 14px 0px 13px 0px;
  justify-content: center;
  align-items: center;
  margin: 32px auto 0 auto;
  background-color: ${({ isActive }) => (isActive ? "#48FFBD" : "#45454B")};
  color: ${({ isActive }) => (isActive ? "#171719" : "#ACACB5")};
  border-radius: 12px;
  font-family: Freesentation;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.72px;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
`;

const BtContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 4px auto 0 auto;
  width: 300px;
`;

const Button = styled.button`
  display: flex;
  width: 100px;
  height: 44px;
  justify-content: center;
  align-items: center;
  color: #767681;
  text-align: center;
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.56px;
  cursor:pointer;
`;

const ScContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 34px auto 0 auto;
  width: 164px;
  gap: 16px;
`;

const Social = styled.button`
  display: flex;
  width: 44px;
  height: 44px;
  cursor:pointer;
  border-radius: 8px;
  overflow: hidden;
`;


const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(id.trim() !== "" && password.trim() !== "");
  }, [id, password]);

  return (
    <>
      <GlobalStyle />
      <div style={{ width: "360px", margin: "auto" }}>
        <Logo>
          <img src={logoSpace} style={{ width: "140px" }} alt="Logo" />
        </Logo>
        <Input
        style={{ margin: "166px auto 0 auto" }}
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
        style={{ margin: "12px auto 0 auto" }}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton isActive={isButtonActive}>로그인</LoginButton>
        <BtContainer>
          <Button style={{ padding: "12 px 22px 12px 20px"}}>아이디 찾기</Button>
          <Button style={{ padding: "12 px 22px 12px 20px"}}>비밀번호 찾기</Button>
          <Button style={{ padding: "12 px 22px 12px 20px"}} onClick={() => navigate('/signup')}>회원가입</Button>
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
      </div>
    </>
  );
}

export default LoginPage;
