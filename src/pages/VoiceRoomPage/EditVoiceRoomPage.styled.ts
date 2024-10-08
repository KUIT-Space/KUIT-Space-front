import styled from "styled-components";

export const TitleDiv = styled.div`
  margin: 1rem 1.125rem 0.75rem 1.125rem;

  color: var(--Foundation-Gray-gray400, var(--GRAY-400, #acacb5));

  /* text/SemiBold 18pt */
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.575rem */
  letter-spacing: 0.045rem;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1.25rem 0rem 0.875rem;

  width: 100%;
`;

export const InnerContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  margin-bottom: 0.5rem;
`;

export const IconImg = styled.img`
  padding: 0.375rem;
  margin-right: 0.75rem;
`;

export const NameDiv = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
`;

export const NameInput = styled.input`
  color: var(--Foundation-Gray-white, #fff);
  width: 100%;
  padding: 0.8125rem 1rem 0.8125rem 1rem;
  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.04rem;

  border-radius: 12px;
  background: var(--Foundation-Gray-gray800, #222226);
  border: none;
  outline: none;

  &:focus {
    border: 1px solid var(--normal, #48ffbd);
  }
`;

export const ClearImg = styled.img`
  padding: 0.5625rem;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0.5rem;
`;
