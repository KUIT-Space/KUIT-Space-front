import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { clearOAuthState, useExchangeCodeForTokens, validateState } from "@/apis/oauth";

interface MessageProps {
  isError?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Message = styled.p<MessageProps>`
  font-size: 16px;
  margin-bottom: 24px;
  color: ${(props) => (props.isError ? "red" : "inherit")};
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DiscordOAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const { mutate: exchangeCode, isPending } = useExchangeCodeForTokens({
    onSuccess: (data) => {
      clearOAuthState();

      if (data.accessToken && data.refreshToken) {
        navigate("/");
      } else {
        setError("서버에서 인증 토큰을 받지 못했습니다.");
      }
    },
    onError: (error) => {
      setError(`인증 실패: ${error.message}`);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      setError("인증 코드가 없습니다. 다시 로그인해 주세요.");
      return;
    }

    if (state) {
      const isValidState = validateState(state);
      if (!isValidState) {
        setError("유효하지 않은 상태 매개변수입니다. CSRF 공격 시도일 수 있습니다.");
        return;
      }
    }

    exchangeCode(code);
  }, [searchParams, exchangeCode]);

  return (
    <Container>
      <Title>디스코드 인증</Title>
      {isPending && (
        <>
          <Spinner />
          <Message>디스코드로 인증 중...</Message>
        </>
      )}
      {error && <Message isError>{error}</Message>}
    </Container>
  );
};

export default DiscordOAuthCallback;
