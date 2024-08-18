import styled from "styled-components";

export const BottomBtn = styled.button`
  padding: 0.875rem;

  left: 50%;
  bottom: 1.25rem;

  width: calc(100% - 4rem);
  max-width: 720px;

  position: fixed;
  transform: translateX(-50%);

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
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  &:active {
    background-color: ${(props) => !props.disabled && props.theme.colors.normal_active};
  }
`;
