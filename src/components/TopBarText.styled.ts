import styled from "styled-components";

export const StyledTopBarDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	width: 100%;
	user-select: none;
`;

export const StyledLeftDiv = styled.div`
	${(props) => props.onClick && "cursor: pointer;"}
	margin-right: auto;
`;

export const StyledCenterDiv = styled.div``;

export const StyledRightDiv = styled.div`
	margin-left: auto;
`;

export const StyledCenterP = styled.p`
	font-family: "Freesentation M";
	font-size: 20px;
	color: white;
`;

export const StyledRightP = styled.p`
	font-family: "Freesentation M";
	font-size: 16px;
	color: white;
	margin-right: 22px;
`;
