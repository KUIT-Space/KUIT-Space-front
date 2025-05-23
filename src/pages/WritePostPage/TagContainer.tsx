import React, { useState } from "react";
import styled from "styled-components";

import Tag from "./Tag";

const StyledTagContainer = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
  max-width: 100vw;
`;

const TagList = styled.div`
  display: inline-flex;
  white-space: nowrap;
  gap: 10px;
  padding: 10px;
  align-items: center;
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
    <>
      <StyledTagContainer>
        <TagList>
          {tagTitles.map((title) => (
            <Tag
              key={title}
              isSelected={!!selectedTags.includes(title)}
              onToggle={() => handleToggle(title)}
            >
              {title}
            </Tag>
          ))}
        </TagList>
      </StyledTagContainer>
    </>
  );
}
