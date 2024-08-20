import styled from "styled-components";

import yellow from "@/assets/VoiceRoom/yellow_gradient.svg";
import purple from "@/assets/VoiceRoom/purple_gradient.svg";

export const DropdownDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  visibility: hidden;
  z-index: 1;
  color: var(--Foundation-Gray-white, #fff);
  margin: 0rem 0rem 0.5rem 1rem;
  padding: 1rem;
  width: 12rem;

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.035rem;
  border-radius: 0.75rem;
  background: var(--GRAY-800, #222226);
`;

export const ActiveP = styled.p`
  font-family: "Freesentation SB";
  font-size: 1.125rem;
`;
export const VRTitleDiv = styled.div`
  font-family: "Freesentation SB";
  font-size: 1.25rem;
  color: black;
  margin: 1rem;
`;
export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  &:hover ${DropdownDiv} {
    visibility: visible;
  }
`;
export const BGdiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: linear-gradient(99deg, #fefc9e 6.74%, #f09b56 94.48%);

  width: 100%;
`;
export const BGdiv2 = styled.div`
  display: flex;
  justify-content: left;
  background-image: url(${purple});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 15.5rem;
`;
export const RoundDiv = styled.div`
  background-color: #222226;
  border-radius: 1.25rem;
  padding: 0.25rem 0.75rem 0.25rem 0.375rem;
  margin: 0.25rem 0rem 0.5rem 1rem;
  font-size: 0.875rem;
  font-family: "Freesentation M";
  color: "#767681";
  width: 10rem;
`;

export const RoundDiv2 = styled.div`
  background-color: #222226;
  border-radius: 1.25rem;
  padding: 0.875rem 1rem 0.875rem 1rem;
  font-size: 0.875rem;
  font-family: "Freesentation M";
  color: "#767681";
  margin: 0.625rem 0rem 0.625rem 0rem;
`;

export const StyledButton = styled.button`
  background-color: #171719;
  border-radius: 0.75rem;
  border: 0.0625rem solid #767681;
  padding: 1rem 0rem 1rem 0rem;
  margin: 0.875rem 0rem 1.25rem 0rem;
  color: #d4d4d9;

  width: 100%;
  font-size: 1.5rem;
  font-family: "Freesentation M";
`;

export const StyledDiv = styled.div`
  width: "100%";
  margin: "auto";
`;
export const NoAlertDiv = styled.div`
  display: flex;
  width: 100%;
  height: 88px;
  justify-content: center;
  align-items: center;

  color: var(--Foundation-Gray-gray500, #767681);

  /* text/Medium 14pt */
  font-family: Freesentation;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.56px;
`;
