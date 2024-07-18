import styled from "styled-components";

const TempDiv = styled.div`
	padding: 0.75rem 1rem 0.75rem 1rem;
	color: var(--Foundation-Gray-gray500, #767681);
	border-radius: 12px;
	background: var(--Foundation-Gray-gray800, #222226);
`;
const BigRoundDiv = ({ content }: { content: string }) => {
	return <TempDiv>{content}</TempDiv>;
};

export default BigRoundDiv;
