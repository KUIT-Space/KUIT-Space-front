import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export interface KeyboardAccessoryViewProps {
  children: ReactNode;
}

const StyledKeyboardAccessoryView = styled.div`
  position: absolute;
  bottom: 10px;
`;

const KeyboardAccessoryView: React.FC<KeyboardAccessoryViewProps> = ({ children }) => {
  return <StyledKeyboardAccessoryView>{children}</StyledKeyboardAccessoryView>;
};

export default KeyboardAccessoryView;
