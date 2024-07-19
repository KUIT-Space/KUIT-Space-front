import styled from "styled-components";
import React from "react";

export const BottomBtn = styled.button`
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
