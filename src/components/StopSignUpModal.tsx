import React from "react";
import * as S from "./StopSignUpModal.styled.ts";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const StopSignUpModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<S.StyledBack>
			<S.ModalContainer>
				<S.Title>회원가입 그만두기</S.Title>
				<S.Content>
					여기서 그만두면 스페이스의
					<br />
					서비스를 이용할 수 없어요!
				</S.Content>
				<S.ButtonContainer>
					<S.CancelButton onClick={onClose}>취소</S.CancelButton>
					<S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
				</S.ButtonContainer>
			</S.ModalContainer>
		</S.StyledBack>
	);
};

export default StopSignUpModal;
