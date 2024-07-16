import styled from "styled-components";

const TempDiv = styled.div`
	padding: 0.75rem 1rem 0.75rem 1rem;
`;
const BigRoundDiv = ({ content }: { content: string }) => {
	return <TempDiv>{content}</TempDiv>;
};

export default BigRoundDiv;
