import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyle, Container, Logo, Input, LoginButton, BtContainer, Button, ScContainer, Social } from "./LoginPage.styled.ts";
import logoSpace from "@/assets/logo_space.svg";
import kakao from "@/assets/Login/icon_kakao.svg";
import google from "@/assets/Login/icon_google.svg";
import naver from "@/assets/Login/icon_naver.svg";

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
			<Container>
				<Logo>
					<img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
				</Logo>
				<Input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
				<Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
				<LoginButton $isActive={isButtonActive}>로그인</LoginButton>
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
