import styled from "styled-components";

export const ContentDiv = styled.div`
	margin: 1rem 1.5rem 0rem 1.5rem;
	display: flex;
	flex-direction: column;
`;
export const TitleDiv = styled.div`
	color: var(--Foundation-Gray-gray200, #efeff0);
	margin: 0rem 0rem 0.5rem 0rem;
	/* text/Regular 16pt */
	font-family: Freesentation R;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.04rem;
`;

export const InputName = styled.input`
	border-radius: 0.75rem;
	border: none;
	padding: 1rem;
	background: var(--Foundation-Gray-gray800, #222226);
	color: var(--Foundation-Gray-white, #fff);

	/* text/Regular 16pt */
	font-family: Freesentation R;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.04rem;

	&:focus {
		outline: none;
		box-shadow: 0rem 0rem 0.25rem var(--Foundation-Main-color-Normal, #48ffbd);
	}
`;
