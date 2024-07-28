import React, { useEffect, useState } from "react";
import SignUpHeader from "@/components/SignUpHeader";
import { StyledText, Container, Input, NextButton } from "./SignUpPage_ID.styled";
import StopSignUpModal from "@/components/StopSignUpModal";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
	const [email, setEmail] = useState("");
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsButtonActive(email.trim() !== "");
	}, [email]);

	const handleBackClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleConfirmModal = () => {
		setIsModalOpen(false);
		navigate(-1);
	};

	return (
		<>
			<SignUpHeader title="회원가입" onBackClick={handleBackClick} />
			<Container>
				<StyledText style={{ alignSelf: "flex-start" }}>아이디로 사용될</StyledText>
				<StyledText style={{ alignSelf: "flex-start" }}>이메일을 입력해주세요</StyledText>
				<Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
				<NextButton $isActive={isButtonActive} $isInputFocused={isInputFocused}>
					다음
				</NextButton>
				<StopSignUpModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmModal} />
			</Container>
		</>
	);
};

export default SignUp;
