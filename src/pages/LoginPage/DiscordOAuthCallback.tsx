import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { clearOAuthState, useExchangeCodeForTokens, validateState } from "@/apis/oauth";

interface MessageProps {
  isError?: boolean;
}

const loadingMessages = [
  {
    title: "우주선 발사 준비 중 🚀",
    message: "Space로 점프하기 위한 워프 드라이브 충전 중...",
  },
  {
    title: "레벨 업 진행 중! ⚔️",
    message: "디스코드 포탈을 통해 Space 월드로 텔레포트 중...",
  },
  {
    title: "마법 주문 시전 중 ✨",
    message: "디스코드의 마법으로 Space의 문을 열고 있어요!",
  },
  {
    title: "로봇 친구 부팅 중 🤖",
    message: "삐빅... 디스코드 인증 프로토콜 실행 중... 삐빅!",
  },
  {
    title: "특별 레시피 준비 중 👨‍🍳",
    message: "디스코드 소스와 Space 재료를 섞어 맛있는 로그인을 만들고 있어요!",
  },
  {
    title: "새로운 모험을 시작합니다! 🧭",
    message: "디스코드 계정으로 Space 세계를 탐험할 준비 중...",
  },
  {
    title: "비트 드랍 준비 중 🎧",
    message: "디스코드와 Space의 완벽한 믹스를 만들고 있어요!",
  },
  {
    title: "변신 중... 🦸‍♂️",
    message: "평범한 디스코드 유저에서 Space 히어로로 변신 중!",
  },
  {
    title: "보물 찾기 항해 중 ⚓",
    message: "디스코드의 지도를 따라 Space 보물섬으로 항해 중이에요!",
  },
  {
    title: "닌자 잠입 작전 진행 중 🥷",
    message: "디스코드의 비밀 통로를 통해 Space로 몰래 잠입 중...",
  },
  {
    title: "타임머신 작동 중 ⏰",
    message: "디스코드 과거에서 Space 미래로 시간 여행 중...",
  },
  {
    title: "옛날 옛적에... 📚",
    message: "디스코드 왕국의 용사가 Space 성으로 가는 중이랍니다!",
  },
];

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
  // 랜덤 로딩 메시지를 위한 상태
  const [loadingMessage, setLoadingMessage] = useState(() => {
    // 컴포넌트 마운트 시 랜덤 메시지 선택
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
  });

  const { mutate: exchangeCode, isPending } = useExchangeCodeForTokens({
    onSuccess: (data) => {
      clearOAuthState();

      if (data.accessToken && data.refreshToken) {
        const redirectPath = localStorage.getItem("redirectPathAfterLogin") || "/";
        localStorage.removeItem("redirectPathAfterLogin");
        navigate(redirectPath);
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
      {isPending && (
        <>
          <Title>{loadingMessage.title}</Title>
          <Spinner />
          <Message>{loadingMessage.message}</Message>
        </>
      )}
      {error && (
        <>
          <Title>인증 오류</Title>
          <Message isError>{error}</Message>
        </>
      )}
    </Container>
  );
};

export default DiscordOAuthCallback;
