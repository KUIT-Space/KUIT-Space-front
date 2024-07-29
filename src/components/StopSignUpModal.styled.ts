import styled from "styled-components";

const StyledBack = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #00000099;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	display: flex;
	padding: 2rem 1rem 0.75rem 1rem;
	flex-direction: column;
	align-items: center;
	border-radius: 0.75rem;
	background: #222226;
`;

const Title = styled.div`
	color: #fff;
	font-family: Freesentation;
	font-size: 1.25rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: 0.025rem;
`;

const Content = styled.div`
	color: #767681;
	text-align: center;
	font-family: Freesentation;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 140%;
	letter-spacing: 0.04rem;
	margin-top: 0.75rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 0.625rem;
	margin-top: 2.25rem;
`;

const CancelButton = styled.button`
	display: flex;
	width: 8.125rem;
	height: 3.25rem;
	padding: 0.875rem 0;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	border-radius: 0.75rem;
	background: #45454b;
	color: #acacb5;
	text-align: center;
	font-family: Freesentation;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: 0.045rem;
`;

const ConfirmButton = styled.button`
	display: flex;
	width: 8.125rem;
	height: 3.25rem;
	padding: 0.875rem 0;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	border-radius: 0.75rem;
	background: #48ffbd;
	color: #171719;
	text-align: center;
	font-family: Freesentation;
	font-size: 1.125rem;
	font-style: normal;
	font-weight: 600;
	line-height: 140%;
	letter-spacing: 0.045rem;
`;
