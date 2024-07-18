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
	font-family: Freesentation;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.64px;
`;
export const CreateBtn = styled.button`
	margin: auto 1.5rem 0rem 1.5rem;

	border: none;
	border-radius: 12px;
	background: var(--Foundation-Gray-gray600, #45454b);
`;
export const InputName = styled.input`
	border-radius: 12px;
	border: none;
	padding: 1rem;
	background: var(--Foundation-Gray-gray800, #222226);
	color: var(--Foundation-Gray-white, #fff);

	/* text/Regular 16pt */
	font-family: Freesentation;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	letter-spacing: 0.64px;

	&:focus {
		outline: none;
		box-shadow: 0px 0px 4px var(--Foundation-Main-color-Normal, #48ffbd);
	}
`;
