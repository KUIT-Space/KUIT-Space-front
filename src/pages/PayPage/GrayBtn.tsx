import styled from "styled-components";

export const GrayBtn = styled.button`
  margin: 1rem;
  padding: 0.75rem 0rem 0.75rem 0rem;

  border: none;
  border-radius: 12px;
  background: var(--Foundation-Gray-gray600, #45454b);

  color: var(--Foundation-Gray-gray500, #767681);
  text-align: center;
  font-family: Freesentation;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.36px;

  /* background: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray600, #45454B);"
      : "var(--Foundation-Main-color-Normal, #48FFBD)"};
	color: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));"
      : "var(--Foundation-Gray-gray900_background, #171719)"}; */
`;
