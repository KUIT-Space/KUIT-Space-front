import styled from "styled-components";

export const ContainerDiv = styled.div`
	display: flex;
	justify-content: center;
	margin: 1.25rem;
	flex-direction: column;
`;

export const RoundDiv = styled.div`
	margin: 0.75rem;
	padding: 0.75rem;

	border-radius: 12px;
	background: var(--Foundation-Gray-gray800, #222226);
`;

export const ContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 24px 20px 24px;

	border-radius: 12px;
	background: var(--GRAY-900, #181818);
`;

export const TitleDiv = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;

	margin-bottom: 9.5px;
	margin-left: 8px;
`;

export const TitleContentDiv = styled.div`
	color: #fff;

	/* text/Bold 18pt */
	font-family: Freesentation;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 140%; /* 25.2px */
	letter-spacing: 0.72px;
`;

export const PriceDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: end;
	margin-bottom: 8px;
`;
export const NowPriceDiv = styled.div`
	color: #fff;
	font-family: Freesentation;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 100%; /* 20px */
	letter-spacing: 0.4px;
`;
export const AllPriceDiv = styled.div`
	color: #fff;
	font-family: Freesentation;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%; /* 12px */
	letter-spacing: 0.24px;
`;

export const TextDiv = styled.div`
	color: var(--GRAY-400, #acacb5);

	/* text/Regular 14pt */
	font-family: Freesentation;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 19.6px */
	letter-spacing: 0.56px;
`;
