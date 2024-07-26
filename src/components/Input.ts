import styled from "styled-components";

export const Input = styled.input`
	display: block;
	width: 100%;
	height: 3.25rem;
	padding: 0.9375rem 1rem;

	border-radius: 0.75rem;
	background: ${({ theme }) => theme.colors.BG800};

	border: 1px solid transparent;
	font-family: Freesentation;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%;

	caret-color: ${({ theme }) => theme.colors.normal};
	&::placeholder {
		color: ${({ theme }) => theme.colors.BG500};
	}
	&:focus {
		border-color: ${({ theme }) => theme.colors.normal};
		outline: none;
	}
`;
