import styled from "styled-components";

export const ProfileDiv = styled.div`
	margin-top: 51px;
`;
export const InnerDiv = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;
export const ContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	width: 100%;
	margin: 64px 77px 77px 0px;
`;

export const TitleDiv = styled.div`
	text-align: center;
	margin: 0px 0px 6px 0px;
`;

export const CreateBtn = styled.button`
	margin: auto 20px 0px 20px;
	padding: 14px;

	border: none;
	border-radius: 12px;

	text-align: center;
	font-family: Freesentation;
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 25.2px */
	letter-spacing: 0.36px;
	background: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray600, #45454B);" : "var(--Foundation-Main-color-Normal, #48FFBD)")};
	color: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));" : "var(--Foundation-Gray-gray900_background, #171719)")};
`;
