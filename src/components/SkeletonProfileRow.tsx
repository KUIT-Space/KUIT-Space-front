import React from "react";
import styled from "styled-components";

import Skeleton from "./Skeleton";

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

function SkeletonProfileRow() {
  return (
    <StyledContainer>
      <Skeleton width="20px" height="20px" borderRadius="50%" />
      <Skeleton height="1rem" width="106px" />
    </StyledContainer>
  );
}

export default SkeletonProfileRow;
