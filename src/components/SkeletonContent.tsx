import React from "react";
import styled from "styled-components";

import Skeleton from "./Skeleton";

interface SkeletonContentProps {
  className?: string;
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.BG800};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 70%;
`;

const MetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.25rem;
`;

const DataRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SkeletonContent: React.FC<SkeletonContentProps> = ({ className }) => {
  return (
    <Container className={className}>
      <TopRow>
        <TitleContainer>
          <Skeleton height="1.25rem" width="90%" />
          <Skeleton height="0.875rem" width="60%" />
        </TitleContainer>

        <Skeleton width="4rem" height="4rem" borderRadius={8} />
      </TopRow>

      <Skeleton height="2.5rem" width="100%" />

      <MetadataContainer>
        <DataRow>
          <Skeleton width="3.5rem" height="0.75rem" />
          <Skeleton width="2.5rem" height="0.75rem" />
        </DataRow>

        <DataRow>
          <Skeleton width="2rem" height="0.75rem" />
          <Skeleton width="2.5rem" height="0.75rem" />
        </DataRow>
      </MetadataContainer>
    </Container>
  );
};

export default SkeletonContent;
