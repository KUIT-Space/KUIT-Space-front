import styled from "styled-components";

export const ChatListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	user-select: none;
	min-height: calc(100vh - 5.625rem - 4rem - 3.75rem); //100vh - ChatAddBtn_height - Header_height - BottomNavBar_height
`;

export const ChatContainer = styled.div`
	display: flex;
	padding: 0.75rem 1.25rem;
	align-items: center;
	gap: 0.75rem;

	${(props) => {
		return props.onClick && "cursor: pointer;";
	}}

	&:active {
		background-color: ${({ theme }) => theme.colors.BG800};
	}

	.chat-btn-img {
		width: 2.5rem;
		height: 2.5rem;
		flex-shrink: 0;
		border-radius: 0.5rem;
		background: lightgray 50% / cover no-repeat;
	}

	.chat--container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.chat-btn--title-time--container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		align-self: stretch;
	}

	.chat-btn-title {
		max-width: 9.375rem;
		color: var(--Foundation-Gray-white, #fff);

		/* text/Medium 16pt */
		font-size: 1rem;
		font-style: normal;
		font-weight: 500;
		line-height: 140%; /* 22.4px */
		letter-spacing: 0.04rem;
	}

	.chat-btn-time {
		color: var(--Foundation-Gray-gray500, #767681);

		/* text/Regular 10pt */
		font-size: 0.625rem;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 14px */
		letter-spacing: 0.0125rem;
	}

	.chat-btn--detail-chatNum--container {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.chat-btn-detail {
		max-width: 13.5rem;
		color: var(--Foundation-Gray-gray300, var(--GRAY-300, #d4d4d9));

		/* text/Regular 14pt */
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 19.6px */
		letter-spacing: 0.035rem;
	}

	.chat-btn-chatNum {
		display: flex;
		height: 1.0625rem;
		max-width: 2.0625rem;
		padding: 0 0.375rem;
		justify-content: flex-end;
		align-items: center;
		border-radius: 100px;
		background: var(--RED, #ff5656);

		/* text/Regular 12pt */
		max-width: 21px;
		color: var(--Foundation-Gray-white, #fff);
		text-align: center;

		font-size: 0.75rem;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 16.8px */
		letter-spacing: 0.015rem;
	}
`;
