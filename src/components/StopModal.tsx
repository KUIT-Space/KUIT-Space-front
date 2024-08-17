import React from "react";

import * as S from "@/components/StopModal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string[];
  contentColor: string;
  confirmButtonColor: string;
  cancelButtonText: string;
  confirmButtonText: string;
  confirmButtonTextColor: string;
}

const StopModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  content,
  contentColor,
  confirmButtonColor,
  cancelButtonText,
  confirmButtonText,
  confirmButtonTextColor,
}) => {
  if (!isOpen) return null;

  const contentLines = content.map((line, index) => (
    <S.Content key={index} contentColor={contentColor}>
      {line}
    </S.Content>
  ));

  return (
    <S.StyledBack>
      <S.ModalContainer>
        <S.Title>{title}</S.Title>
        {contentLines}
        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>{cancelButtonText}</S.CancelButton>
          <S.ConfirmButton
            confirmButtonColor={confirmButtonColor}
            confirmButtonTextColor={confirmButtonTextColor}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </S.ConfirmButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.StyledBack>
  );
};

export default StopModal;
