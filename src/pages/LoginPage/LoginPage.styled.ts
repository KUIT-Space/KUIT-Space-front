import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	width: 100%;
	max-width: 22.5rem;
	margin: auto;
`;

export const Logo = styled.div`
	display: flex;
	width: 38.89%; /* 140px of 360px */
`;

export const Input = styled.input`
	display: flex;
	width: 88.89%; /* 320px of 360px */
	height: 3.25rem; /* 52px */
	border-radius: 0.75rem; /* 12px */
	padding: 0.9375rem; /* 15px */
	padding-left: 1rem; /* 16px */
	border: 1px solid transparent;
	background-color: #222226;
	font-family: Freesentation;
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 400;
	line-height: 140%;
	letter-spacing: 0.04rem; /* 0.64px */
	color: #ffffff;
	caret-color: #48ffbd;
	margin-top: 1rem;

	&::placeholder {
		color: #767681;
	}

	&:focus {
		border-color: #48ffbd;
		outline: none;
	}
`;

interface LoginButtonProps {
	$isActive: boolean;
}

export const LoginButton = styled.button<LoginButtonProps>`
	display: flex;
	width: 88.89%; /* 320px of 360px */
	height: 3.25rem; /* 52px */
	padding: 0.875rem 0 0.8125rem 0; /* 14px 0 13px 0 */
	justify-content: center;
	align-items: center;
	margin-top: 2rem; /* 32px */
	background-color: ${({ $isActive }) => ($isActive ? "#48FFBD" : "#45454B")};
	color: ${({ $isActive }) => ($isActive ? "#171719" : "#ACACB5")};
	border-radius: 0.75rem; /* 12px */
	font-family: Freesentation;
	font-size: 1.125rem; /* 18px */
	font-style: normal;
	font-weight: 700;
	line-height: 140%;
	letter-spacing: 0.045rem; /* 0.72px */
	cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
`;

export const BtContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.25rem; /* 4px */
	width: 83.33%; /* 300px of 360px */
`;

export const Button = styled.button`
	display: flex;
	width: 6.25rem; /* 100px of 360px */
	height: 2.75rem; /* 44px */
	justify-content: center;
	align-items: center;
	color: #767681;
	text-align: center;
	font-family: Freesentation;
	font-size: 0.875rem; /* 14px */
	font-style: normal;
	font-weight: 400;
	line-height: 140%;
	letter-spacing: 0.035rem; /* 0.56px */
	cursor: pointer;
`;

export const ScContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1.6875rem; /* 27px */
	width: 45.56%; /* 164px of 360px */
	gap: 1rem; /* 16px */
`;

export const Social = styled.button`
	display: flex;
	width: 2.75rem; /* 44px */
	height: 2.75rem; /* 44px */
	cursor: pointer;
	border-radius: 0.5rem; /* 8px */
	overflow: hidden;
`;
