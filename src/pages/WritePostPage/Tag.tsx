import React from "react";
import styled from "styled-components";

const StyledTag = styled.button<{ isSelected?: boolean }>`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background-color: ${({ theme, isSelected }) => !isSelected && theme.colors.BG850};
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.normal : theme.colors.BG500)};
  border: 1px solid
    ${({ theme, isSelected }) => (isSelected ? theme.colors.normal : theme.colors.BG850)};
  cursor: pointer;
  outline: none;
`;

interface TagProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onToggle?: () => void;
}

export default function Tag({ children, isSelected, onToggle }: TagProps) {
  const handleClick = () => {
    onToggle?.();
  };

  return (
    <StyledTag onClick={handleClick} isSelected={isSelected}>
      {children}
    </StyledTag>
  );
}
