import styled from "styled-components";

export const StyledTopBarDiv = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	width: 100%;
	user-select: none;
	margin: 0.5rem 0.625rem 0.5rem 0.625rem;
`;

export const StyledLeftDiv = styled.div`
	${(props) => props.onClick && "cursor: pointer;"}
	margin-right: auto;
`;

export const StyledCenterDiv = styled.div`
	font-family: "Freesentation M";
	font-size: 1.25rem;
	color: white;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0%);
`;

export const StyledRightDiv = styled.div`
	margin-left: auto;
`;

export const StyledCenterP = styled.p``;

export const StyledRightP = styled.p`
	font-family: "Freesentation M";
	font-size: 16px;
	color: white;
	margin-right: 22px;
`;
