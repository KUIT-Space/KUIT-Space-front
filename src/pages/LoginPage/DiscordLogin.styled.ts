import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 22.5rem;
  margin-top: 11.1rem;
`;

export const Logo = styled.div`
  display: flex;
  width: 7.95725rem;
  margin-top: 1.45rem;
`;

export const Star = styled.div`
  display: flex;
  zindex: -1;
  position: absolute;
`;

export const Description = styled.p`
  color: #fff;
  text-align: center;
  /* text/Bold 28pt */
  font-family: Freesentation;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 2.45rem */
  letter-spacing: 0.035rem;
  margin-top: 2.74rem;
`;

export const LoginButton = styled.button`
  display: flex;
  width: calc(100% - 3rem);
  height: 3.25rem;
  padding: 0.875rem 0 0.8125rem 0;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin-top: 8.31rem;
  margin-bottom: 13.31rem;
  background: #5765ec;
  border-radius: 0.75rem;
  color: var(--Foundation-Gray-white, #fff);
  text-align: center;
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.575rem */
  letter-spacing: 0.0225rem;
`;

export const DiscordLogo = styled.div`
  display: flex;
`;
