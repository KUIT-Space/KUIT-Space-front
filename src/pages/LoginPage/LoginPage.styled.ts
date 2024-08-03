import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 40rem;
	margin: 0 auto;
`;

export const Logo = styled.div`
	display: flex;
	width: 38.89%;
	margin-top: 10rem;
`;

export const Input = styled.input`
	display: flex;
	width: calc(100% - 2.5rem);
	height: 3.25rem;
	box-sizing: border-box;
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
	margin-top: 0.75rem;

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
	width: calc(100% - 2.5rem);
	height: 3.25rem;
	padding: 0.875rem 0 0.8125rem 0;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
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

export const BtContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.25rem;
	width: 83.33%;
`;

export const Button = styled.button`
	display: flex;
	width: 6.25rem;
	height: 2.75rem;
	justify-content: center;
	align-items: center;
	color: #767681;
	text-align: center;
	font-family: Freesentation;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%;
	letter-spacing: 0.035rem;
	cursor: pointer;
`;

export const ScContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1.6875rem;
	width: 45.56%;
	gap: 1rem;
	margin-bottom: 1.75rem;
`;

export const Social = styled.button`
	display: flex;
	width: 2.75rem;
	height: 2.75rem;
	cursor: pointer;
	border-radius: 0.5rem;
	overflow: hidden;
`;
