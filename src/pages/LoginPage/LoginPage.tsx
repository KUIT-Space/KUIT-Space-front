import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Logo, Input, LoginButton, BtContainer, Button, ScContainer, Social } from "@/pages/LoginPage/LoginPage.styled.ts";
import logoSpace from "@/assets/logo_space.svg";
import kakao from "@/assets/Login/icon_kakao.svg";
import google from "@/assets/Login/icon_google.svg";
import naver from "@/assets/Login/icon_naver.svg";
import axios from 'axios';

const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isButtonActive, setIsButtonActive] = useState(false);

	const validateEmail = (email:string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePassword = (password:string) => {
		const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
		return re.test(password);
	};

	useEffect(() => {
		const isValid = validateEmail(email) && validatePassword(password);
		setIsButtonActive(isValid);
	}, [email, password]);

	const handleLogin = async () => {
		if (!isButtonActive) return;
		try {
			const response = await axios.post('/user/login', {
				email: email,
				password: password,
			});

			if (response.status === 200) {
				const token = response.headers.authorization;
				    
				localStorage.setItem('jwt', token);
				navigate('/dashboard');
			} else {
				console.error('로그인 실패:', response.data.message);
			}
		 } catch (error) {
    if (error instanceof Error) {
      console.error('로그인 실패:', error.message);
    } else {
      console.error('로그인 실패:', error);
    }
  }
	};

	return (
		<>
			<Container>
				<Logo>
					<img src={logoSpace} style={{ width: "100%" }} alt="Logo" />
				</Logo>
				<Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: "10.37rem" }} />
				<Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
				<LoginButton $isActive={isButtonActive} onClick={handleLogin}>로그인</LoginButton>
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
