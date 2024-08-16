import styled from "styled-components";

export const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.625rem 0.25rem 1.25rem;
  border-bottom: 1px solid var(--Foundation-Gray-gray800, #222226);

  color: var(--Foundation-Gray-white, #fff);
  /* regular/14pt */
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.035rem;

  .board-filter-section {
    display: flex;
    align-items: center;
    cursor: pointer;

    color: var(--Foundation-Gray-gray500, #767681);

    :first-child {
      padding: 0.563rem;
    }
  }
`;
