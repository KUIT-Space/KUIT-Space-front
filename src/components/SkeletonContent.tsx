import React from "react";
import styled from "styled-components";

import Skeleton from "./Skeleton";

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;

const StyledMetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledImageContainer = styled.div`
  /* width: fit-content; */
  /* height: fit-content; */
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function SkeletonContent() {
  return (
    <StyledContainer>
      <StyledTextContainer>
        <Skeleton height="1.25rem" width="60%" />
        <Skeleton height="2.5rem" width="100%" />
      </StyledTextContainer>
      <StyledImageContainer>
        <Skeleton width="100%" height="10rem" />
      </StyledImageContainer>
      <StyledMetadataContainer>
        <Skeleton width="6rem" height="1rem" />
        <Skeleton width="6rem" height="1rem" />
      </StyledMetadataContainer>
    </StyledContainer>
  );
}

export default SkeletonContent;
