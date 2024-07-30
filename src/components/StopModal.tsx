import React from "react";
import * as S from "./StopModal.styled.ts";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	content: string[];
	confirmButtonColor: string;
	cancelButtonText: string;
	confirmButtonText: string;
}

const StopModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, content, confirmButtonColor, cancelButtonText, confirmButtonText }) => {
	if (!isOpen) return null;
	const contentLines = content.map((line, index) => <div key={index}>{line}</div>);
	return (
		<S.StyledBack>
			<S.ModalContainer>
				<S.Title>{title}</S.Title>
				<S.Content>{contentLines}</S.Content>
				<S.ButtonContainer>
					<S.CancelButton onClick={onClose}>{cancelButtonText}</S.CancelButton>
					<S.ConfirmButton confirmButtonColor={confirmButtonColor} onClick={onConfirm}>
						{confirmButtonText}
					</S.ConfirmButton>
				</S.ButtonContainer>
			</S.ModalContainer>
		</S.StyledBack>
	);
};

export default StopModal;
