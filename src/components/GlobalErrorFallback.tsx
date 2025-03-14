import { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UnauthorizedError } from "@/utils/HttpErrors";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const ErrorTitle = styled.h2`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.char_red};
`;

const ErrorMessage = styled.p`
  margin-bottom: 24px;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.normal};
  color: ${({ theme }) => theme.colors.BG900};
  border: none;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.normal_hover};
  }
`;

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error instanceof UnauthorizedError) {
      localStorage.setItem("redirectPathAfterLogin", location.pathname);
      resetErrorBoundary();
      navigate("/discordlogin");
    }
  }, [error, navigate, location, resetErrorBoundary]);

  return (
    <ErrorContainer>
      <ErrorTitle>문제가 발생했습니다</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={resetErrorBoundary}>다시 시도하기</RetryButton>
    </ErrorContainer>
  );
};

export default GlobalErrorFallback;
