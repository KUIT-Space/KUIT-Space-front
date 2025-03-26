import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  animation?: boolean;
  children?: ReactNode;
}

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledSkeleton = styled.div<SkeletonProps>`
  display: inline-block;
  width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width || "100%"};
  height: ${(props) =>
    typeof props.height === "number" ? `${props.height}px` : props.height || "1rem"};
  border-radius: ${(props) =>
    typeof props.borderRadius === "number"
      ? `${props.borderRadius}px`
      : props.borderRadius || "4px"};
  background-color: ${(props) => props.theme.colors.BG700};
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.animation &&
    `
    background: linear-gradient(
      90deg,
      ${props.theme.colors.BG700} 25%,
      ${props.theme.colors.BG600} 50%,
      ${props.theme.colors.BG700} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
  `}
`;

const Skeleton = ({
  width,
  height,
  borderRadius,
  animation = true,
  children,
  ...rest
}: SkeletonProps) => {
  return (
    <StyledSkeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      animation={animation}
      {...rest}
    >
      {children}
    </StyledSkeleton>
  );
};

export default Skeleton;
