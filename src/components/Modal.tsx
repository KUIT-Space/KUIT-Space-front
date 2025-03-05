import React from "react";
import {
  StyledBack,
  ModalContainer,
  Title,
  Content,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
} from "@/components/Modal.styled";

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string[];
  leftButtonText: string;
  rightButtonText: string;
  leftButtonColor: string;
  rightButtonColor: string;
  rightButtonTextColor: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  leftButtonText,
  rightButtonText,
  leftButtonColor,
  rightButtonColor,
  rightButtonTextColor,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <StyledBack>
      <ModalContainer>
        <Title>{title}</Title>
        {content.map((text, index) => (
          <Content key={index}>{text}</Content>
        ))}
        <ButtonContainer>
          <CancelButton onClick={onClose} style={{ background: leftButtonColor }}>
            {leftButtonText}
          </CancelButton>
          <ConfirmButton
            onClick={onConfirm}
            color={rightButtonColor}
            textColor={rightButtonTextColor}
          >
            {rightButtonText}
          </ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </StyledBack>
  );
};

export default Modal;
