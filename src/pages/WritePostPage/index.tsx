import React from "react";
import styled from "styled-components";

import KeyboardAccessoryView from "@/components/KeyboardAccessoryView";
import useVisualViewportResize from "@/hooks/useVisualViewportResize";

const StyledInput = styled.input`
  font-size: 16px;
  width: 100%;
  height: 32px;
  border: 1px solid #000;
`;

const StyledDiv = styled.div`
  height: 100%;
  position: relative;
`;

export default function WritePostPage() {
  const ref = useVisualViewportResize();

  return (
    <StyledDiv ref={ref}>
      <StyledInput type="text" />
      <KeyboardAccessoryView>
        <div>안드로이드</div>
        <div>안드로이드</div>
        <div>안드로이드</div>
        <div>안드로이드</div>
        <div>안드로이드</div>
      </KeyboardAccessoryView>
    </StyledDiv>
  );
}
