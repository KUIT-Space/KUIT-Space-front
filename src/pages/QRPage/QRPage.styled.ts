import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.25rem;
`;

export const ImgQR = styled.img`
  border-radius: 12px;
  width: 15rem;
  height: 15rem;
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;

  /* text/SemiBold 34pt */
  font-family: Freesentation;
  font-size: 34px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 47.6px */
  letter-spacing: 0.68px;

  margin-top: 1.3125rem;
`;

export const DateDiv = styled.div`
  color: var(--Foundation-Gray-gray400, #acacb5);
  text-align: center;

  /* text/Medium 20pt */
  font-family: Freesentation;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 28px */
  letter-spacing: 0.4px;
`;
