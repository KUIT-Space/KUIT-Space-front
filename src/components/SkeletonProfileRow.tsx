import React from "react";
import styled from "styled-components";

import Skeleton from "./Skeleton";

interface SkeletonProfileRowProps {
  showAction?: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  gap: 1rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const ActionContainer = styled.div`
  margin-left: auto;
`;

const SkeletonProfileRow: React.FC<SkeletonProfileRowProps> = ({ showAction = false }) => {
  return (
    <Container>
      <Skeleton width="3rem" height="3rem" borderRadius="50%" />

      <ProfileInfo>
        <Skeleton height="1rem" width="40%" />
        <Skeleton height="0.75rem" width="60%" />
      </ProfileInfo>

      {showAction && (
        <ActionContainer>
          <Skeleton width="4rem" height="1.5rem" borderRadius="1rem" />
        </ActionContainer>
      )}
    </Container>
  );
};

export default SkeletonProfileRow;
