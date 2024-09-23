import styled from "styled-components";

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

export const MyDiv = styled.div`
  width: 5rem;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px red solid;
  border-radius: 50%;
`;

export const MainVRuserImg = styled.img`
  width: 4rem;
  height: 4rem;
`;
