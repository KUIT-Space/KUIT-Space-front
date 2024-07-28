import styled from "styled-components";
import React from "react";

export const NormalBtn = styled.button`
	margin: 0.75rem;
	padding: 0.875rem 0rem 0.8125rem 0rem;

	width: 40rem;

	border: none;
	border-radius: 0.75rem;
	background: var(--Foundation-Main-color-Sub-color-gradient02, linear-gradient(76deg, #5ad7fe -1.06%, #48ffbd 96.33%));

	color: var(--Foundation-Gray-gray900_background, #171719);
	text-align: center;
	font-family: Freesentation;
	font-size: 18px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 25.2px */
	letter-spacing: 0.36px;

	/* background: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray600, #45454B);" : "var(--Foundation-Main-color-Normal, #48FFBD)")};
	color: ${(props) => (props.disabled ? "var(--Foundation-Gray-gray400, var(--GRAY-400, #ACACB5));" : "var(--Foundation-Gray-gray900_background, #171719)")}; */
`;
