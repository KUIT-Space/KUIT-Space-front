import React from "react";
import styled from "styled-components";

import SkeletonContent from "./SkeletonContent";
import SkeletonProfileRow from "./SkeletonProfileRow";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export default function SkeletonItem() {
  return (
    <StyledContainer>
      <SkeletonProfileRow />
      <SkeletonContent />
    </StyledContainer>
  );
}
