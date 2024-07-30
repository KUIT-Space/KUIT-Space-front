import styled from "styled-components";
import React from "react";

export const NormalBtn = styled.button`
	margin: 1rem;
	padding: 0.75rem 0rem 0.75rem 0rem;

	border: none;
	border-radius: 12px;
	background: var(--Foundation-Main-color-Normal, #48ffbd);

	color: var(--Foundation-Gray-gray900_background, #171719);
	text-align: center;
	font-family: Freesentation;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 1.575rem */
	letter-spacing: 0.0225rem;

	/* background: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray600, #45454B);" : "var(--Foundation-Main-color-Normal, #48FFBD)")};
	color: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));" : "var(--Foundation-Gray-gray900_background, #171719)")}; */
`;