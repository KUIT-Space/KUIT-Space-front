import styled from "styled-components";

export const StyledBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000099;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  display: flex;
  padding: 2rem 1rem 0.75rem 1rem;
  flex-direction: column;
  align-items: center;
  border-radius: 0.75rem;
  background: #222226;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0.025rem;
  padding-bottom: 0.75rem;
`;

export const Content = styled.div`
  color: #767681;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.04rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: 2.25rem;
`;

export interface CancelButtonProps {
  color?: string;
  textColor?: string;
}

export const CancelButton = styled.button<CancelButtonProps>`
  display: flex;
  width: 8.125rem;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
  background: ${({ color = "#ACACB5" }) => color}; //기본 회색
  color: ${({ textColor = "#FFFFFF" }) => textColor};
`;

export interface ConfirmButtonProps {
  color?: string;
  textColor?: string;
}

export const ConfirmButton = styled.button<ConfirmButtonProps>`
  display: flex;
  width: 8.125rem;
  height: 3.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ color = "#48FFBD" }) => color}; //기본 초록색
  color: ${({ textColor = "#FFFFFF" }) => textColor};
`;
