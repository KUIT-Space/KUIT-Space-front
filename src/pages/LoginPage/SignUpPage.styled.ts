import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const StyledText = styled.div`
  color: #fff;
  font-family: Freesentation;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0.03rem;
  width: calc(100% - 2.5rem);
  margin-top: 2.5rem;
`;

interface ExplanationProps {
  $state?: "empty" | "invalid" | "valid";
  $isValid?: boolean;
}

export const Explanation = styled.div<ExplanationProps>`
  color: ${({ $state, $isValid }) => {
    if ($state === "empty") return "#767681";
    if ($isValid === false) return "#FF5656";
    if ($isValid === true) return "#48FFBD";
    return "#767681";
  }};
  font-family: Freesentation;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  letter-spacing: 0.0175rem;
  margin-top: 0.38rem;
  width: calc(100% - 2.5rem);

  span {
    color: ${({ $state, $isValid }) => {
      if ($state === "empty") return "#767681";
      if ($isValid === false) return "#FF5656";
      if ($isValid === true) return "#48FFBD";
      return "#767681";
    }};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: calc(100% - 2.5rem);
  max-width: 40rem;
`;

export const Input = styled.input<{
  $state?: "empty" | "invalid" | "valid";
  $isValid?: boolean;
  $isOverMaxLength?: boolean;
}>`
  display: flex;
  width: 100%;
  height: 3.25rem;
  border-radius: 0.75rem;
  padding: 0.9375rem;
  padding-left: 1rem;
  border: 1px solid transparent;
  background-color: #222226;
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.04rem;
  color: #ffffff;
  caret-color: #48ffbd;
  margin-top: 3.25rem;
  box-sizing: border-box;

  &::placeholder {
    color: #767681;
  }

  &:focus {
    border-color: ${({ $isValid }) => ($isValid ? "#48FFBD" : "#FF5656")};
    outline: none;
  }
`;

interface NextButtonProps {
  $isActive: boolean;
  $isInputFocused: boolean;
}

export const NextButton = styled.button<NextButtonProps>`
  display: flex;
  width: calc(100% - 2.5rem);
  max-width: 37.5rem;
  height: 3.25rem;
  position: fixed;
  bottom: ${({ $isInputFocused }) => ($isInputFocused ? "0" : "0.75rem")};
  padding: 0.875rem 0 0.8125rem 0;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? "#48FFBD" : "#45454B")};
  color: ${({ $isActive }) => ($isActive ? "#171719" : "#ACACB5")};
  border-radius: 0.75rem;
  font-family: Freesentation;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: 0.045rem;
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
`;

export const NameCount = styled.span`
  position: absolute;
  top: 0.94rem;
  right: 1rem;
  color: #767681;
  font-family: Freesentation;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.04rem;
  padding: 0 0.25rem;
  z-index: 300;
`;
