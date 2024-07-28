import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	margin: 2.5rem 1.25rem 3.25rem 1.25rem;
	flex-direction: column;
	align-items: center;
`;

export const StyledText = styled.div`
	color: #fff;
	font-family: Freesentation;
	font-size: 1.5rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: 0.03rem;
`;

export const Input = styled.input`
	display: flex;
	width: 100%;
	height: 3.25rem;
	border-radius: 0.75rem;
	padding: 0.9375rem;
	padding-left: 1rem;
	border: 1px solid transparent;
	background-color: #222226;
	font-family: Freesentation;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%;
	letter-spacing: 0.04rem;
	color: #ffffff;
	caret-color: #48ffbd;
	margin-top: 3.25rem;

	&::placeholder {
		color: #767681;
	}

	&:focus {
		border-color: #48ffbd;
		outline: none;
	}
`;

interface NextButtonProps {
	$isActive: boolean;
	$isInputFocused: boolean;
}

export const NextButton = styled.button<NextButtonProps>`
	display: flex;
	width: calc(100% - 2.5rem);
	height: 3.25rem;
	position: fixed;
	bottom: ${({ $isInputFocused }) => ($isInputFocused ? "0" : "0.75rem")};
	padding: 0.875rem 0 0.8125rem 0;
	justify-content: center;
	align-items: center;
	background-color: ${({ $isActive }) => ($isActive ? "#48FFBD" : "#45454B")};
	color: ${({ $isActive }) => ($isActive ? "#171719" : "#ACACB5")};
	border-radius: 0.75rem;
	font-family: Freesentation;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 700;
	line-height: 140%;
	letter-spacing: 0.045rem;
	cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
`;
