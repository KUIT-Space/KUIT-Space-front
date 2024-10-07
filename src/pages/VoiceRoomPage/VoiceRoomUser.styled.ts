import styled, { css, keyframes } from "styled-components";

interface props {
  x: number;
  y: number;
  $enabled?: boolean;
}

export const VRuserA = styled.a`
  color: var(--Foundation-Gray-white, #fff);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.035rem;
`;

export const VRuserListDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const VRuserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const VRuserImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
`;

export const MicImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: auto;
`;
const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(101, 255, 120, 0.3),
                0 0 0 0.5em rgba(101, 255, 120, 0.3),
                0 0 0 1em rgba(101, 255, 120, 0.3),
                0 0 0 1.5em rgba(101, 255, 120, 0.3);
  }
  100% {
    box-shadow: 0 0 0 1em rgba(101, 255, 120, 0.3),
                0 0 0 1.5em rgba(101, 255, 120, 0.3),
                0 0 0 2em rgba(101, 255, 120, 0.3),
                0 0 0 2.5em rgba(101, 255, 120, 0);
  }
`;

export const MyDiv = styled.div<props>`
  width: 5rem;
  height: 5rem;

  position: relative;
  top: ${(props) => props.x + "%"};
  left: ${(props) => props.y + "%"};

  display: flex;
  align-items: center;
  justify-content: center;
  border: "1px white solid";
  animation: ${(props) =>
    props.$enabled &&
    css`
      ${ripple} 1s ease-in
    `};
  border-radius: 50%;
`;

export const MainVRuserImg = styled.img`
  width: 4rem;
  height: 4rem;
`;
