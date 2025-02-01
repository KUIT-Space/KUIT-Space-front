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
  const divRef = useRef<HTMLDivElement>(null);

  const handleVisualViewportResize = (event: Event) => {
    const visualViewportHeight = window.visualViewport?.height;
    if (visualViewportHeight && divRef.current) {
      divRef.current.style.height = `${visualViewportHeight - 30}px`;
      window.scrollTo(0, 40);
    }
  };

  useEffect(() => {
    const resizeAbortController = new AbortController();

    if (visualViewport) {
      visualViewport.addEventListener("resize", handleVisualViewportResize, {
        signal: resizeAbortController.signal,
      });
    }

    return () => {
      console.log("visualViewport unregistered");
      resizeAbortController.abort();
    };
  }, []);

  return <StyledKeyboardAccessoryView>{children}</StyledKeyboardAccessoryView>;
};

export default KeyboardAccessoryView;
