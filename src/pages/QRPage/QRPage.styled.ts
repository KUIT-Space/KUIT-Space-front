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
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.75rem */
  letter-spacing: 0.025rem;
`;

export const QRHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.625rem 1.25rem 1.0625rem 1.25rem;
`;

export const QRAttendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
`;

export const QRAttendWrapper = styled.div`
  border-radius: 0.75rem;

  padding: 1rem 0.875rem 0.75rem 0.875rem;
  background: #222226;
  gap: 0.625rem;

  display: flex;
  flex-direction: row;

  position: relative;
`;

export const QRAttendDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QRAttendTitle = styled.div`
  color: #fff;
  font-family: Freesentation;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 1.25rem */
  letter-spacing: 0.025rem;
  margin-bottom: 0.3125rem;
`;

export const QRAttendContent1 = styled.div`
  color: #acacb5;

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
  letter-spacing: 0.035rem;
`;

export const QRAttendContent2 = styled.div`
  color: var(--foundation-main-color-normal-active, #3acc97);

  /* text/Regular 14pt */
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
  letter-spacing: 0.035rem;
`;

export const QRAttendDate = styled.div`
  color: #acacb5;

  /* text/Regular 10pt */
  font-family: Freesentation;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 0.875rem */
  letter-spacing: 0.0125rem;
`;

export const QRAttendDelete = styled.img`
  position: absolute;
  top: 0.5625rem;
  right: 0.5625rem;
  cursor: pointer;
`;

export const QRAttendEdit = styled.img`
  position: absolute;
  top: 0.5625rem;
  right: 2.1875rem;
  cursor: pointer;
`;
export const QRImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const QRAttendListDiv = styled.div`
  display: flex;
  margin: 2.75rem 1.25rem 0 1.25rem;
  gap: 0.75rem;
`;

export const QRAttendListContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
