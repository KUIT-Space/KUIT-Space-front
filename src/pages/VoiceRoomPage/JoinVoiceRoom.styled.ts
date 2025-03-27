import styled from "styled-components";

export const ProfileDiv = styled.div`
  margin-top: 3.1875rem;
`;
export const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: 4rem 4.8125rem 4.8125rem 0rem;
`;

export const TitleDiv = styled.div`
  text-align: center;
  margin: 0rem 0rem 0.375rem 0rem;
`;

export const CreateBtn = styled.button`
  margin: auto 1.25rem 0rem 1.25rem;
  padding: 0.875rem;

  border: none;
  border-radius: 0.75rem;

  text-align: center;
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.0225rem;
  background: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray600, #45454B);"
      : "var(--Foundation-Main-color-Normal, #48FFBD)"};
  color: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));"
      : "var(--Foundation-Gray-gray900_background, #171719)"};
`;
