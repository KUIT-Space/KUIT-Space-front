import React, { useState } from "react";
import styled from "styled-components";

import Tag from "./Tag";

const StyledTagContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;

interface TagContainerProps {
  tagTitles: string[];
}

export default function TagContainer({ tagTitles }: TagContainerProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleToggle = (title: string) => {
    setSelectedTags((prev) =>
      prev.includes(title) ? prev.filter((tag) => tag !== title) : [...prev, title],
    );
  };

  return (
    <StyledTagContainer>
      {tagTitles.map((title) => (
        <Tag
          key={title}
          isSelected={!!selectedTags.includes(title)}
          onToggle={() => handleToggle(title)}
        >
          {title}
        </Tag>
      ))}
    </StyledTagContainer>
  );
}
