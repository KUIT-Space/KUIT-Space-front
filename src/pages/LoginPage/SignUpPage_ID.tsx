import React, { useEffect, useState } from "react";
import SignUpHeader from "@/components/SignUpHeader";
import { StyledText, Container, Input, NextButton } from "@/pages/LoginPage/SignUpPage.styled";
import StopModal from "@/components/StopModal";
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
				<StyledText>아이디로 사용될</StyledText>
				<StyledText>이메일을 입력해주세요</StyledText>
				<Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
				<NextButton $isActive={isButtonActive} $isInputFocused={isInputFocused}>
					다음
				</NextButton>
				<StopModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onConfirm={handleConfirmModal}
					title="회원가입 그만두기"
					content={["여기서 그만두면 스페이스의", "서비스를 이용할 수 없어요!"]}
					confirmButtonColor="#48FFBD"
					cancelButtonText="취소"
					confirmButtonText="확인"
				/>
			</Container>
		</>
	);
};

export default SignUp;
