import styled from "styled-components";

export const BottomFloatBtn = styled.button`
  left: 50%;
  bottom: 4.5625rem;

  max-width: 12.5rem;

  position: fixed;
  transform: translateX(-50%);

  border-radius: 1.5rem;
  border: 0.0625rem solid var(--Foundation-Gray-gray600, #45454b);
  background: #222226;

  display: inline-flex;
  padding: 0.75rem 1.5rem;
  align-items: center;
  gap: 0.75rem;

  color: #acacb5;
  text-align: center;

  /* text/Bold 16pt */
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
  letter-spacing: 0.02rem;
  /*
  background: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray600, #45454B);"
      : "var(--Foundation-Main-color-Normal, #48FFBD)"};
  color: ${(props) =>
    props.disabled
      ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));"
      : "var(--Foundation-Gray-gray900_background, #171719)"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  &:active {
    background-color: ${(props) => !props.disabled && props.theme.colors.normal_active};
  } */
`;
