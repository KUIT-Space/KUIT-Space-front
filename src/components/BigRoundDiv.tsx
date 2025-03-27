import React from "react";
import styled from "styled-components";

const MyDiv = styled.div`
  padding: 0.75rem 1rem 0.75rem 1rem;
  color: var(--Foundation-Gray-gray500, #767681);
  border-radius: 12px;
  background: var(--Foundation-Gray-gray800, #222226);
`;
const BigRoundDiv = ({ content }: { content: string }) => {
  return <MyDiv>{content}</MyDiv>;
};

export default BigRoundDiv;
