import styled from "styled-components";
import React from "react";

export const BottomBtn = styled.button`
	margin: auto 1.25rem 0rem 1.25rem;
	padding: 0.875rem;

	position: absolute;
	bottom: 0;
	width: 100%;

	border: none;
	border-radius: 0.75rem;

	text-align: center;
	font-family: Freesentation;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 25.2px */
	letter-spacing: 0.0225rem;
	background: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray600, #45454B);" : "var(--Foundation-Main-color-Normal, #48FFBD)")};
	color: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));" : "var(--Foundation-Gray-gray900_background, #171719)")};
`;
