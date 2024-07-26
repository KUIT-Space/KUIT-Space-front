import styled from "styled-components";

export const ChatroomAddImgBtn = styled.button`
	display: flex;
	width: 8.5rem;
	height: 8.5rem;
	padding: 2.25rem;
	margin: 2.5rem auto;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	border-radius: 0.75rem;
	background: var(--Foundation-Gray-gray500, #767681);
`;

export const ChatCreateContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.input--container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const InputContainer = styled.div``;

export const ChatroomName = styled.div<{ nameLength: number }>`
	position: relative;

	span {
		position: absolute;
		bottom: 0.9375rem;
		right: 1rem;

		color: var(--Foundation-Gray-gray500, #767681);
		text-align: right;

		/* text/Regular 16pt */
		font-family: Freesentation;
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 1.4rem */
		letter-spacing: 0.04rem;
	}

	input {
		caret-color: ${(props) => (props.nameLength >= 15 ? props.theme.colors.char_red : props.theme.colors.normal)};
		&:focus {
			border-color: ${(props) => (props.nameLength >= 15 ? props.theme.colors.char_red : props.theme.colors.normal)};
		}
	}
`;
