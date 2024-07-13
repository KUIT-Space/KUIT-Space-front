import styled from "styled-components";

export const ChatListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	user-select: none;
`;

export const ChatContainer = styled.div`
	display: flex;
	padding: 12px 20px;
	align-items: center;
	gap: 12px;

	${(props) => {
		return props.onClick && "cursor: pointer;";
	}}

	&:active {
		background-color: ${({ theme }) => theme.colors.BG800};
	}

	.chat-btn-img {
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		border-radius: 8px;
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
		gap: 8px;
		align-self: stretch;
	}

	.chat-btn-title {
		max-width: 150px;
		color: var(--Foundation-Gray-white, #fff);

		/* text/Medium 16pt */
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 140%; /* 22.4px */
		letter-spacing: 0.64px;
	}

	.chat-btn-time {
		color: var(--Foundation-Gray-gray500, #767681);

		/* text/Regular 10pt */
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 14px */
		letter-spacing: 0.2px;
	}

	.chat-btn--detail-chatNum--container {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.chat-btn-detail {
		max-width: 216px;
		color: var(--Foundation-Gray-gray300, var(--GRAY-300, #d4d4d9));

		/* text/Regular 14pt */
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 19.6px */
		letter-spacing: 0.56px;
	}

	.chat-btn-chatNum {
		display: flex;
		height: 17px;
		max-width: 33px;
		padding: 0px 6px;
		justify-content: flex-end;
		align-items: center;
		border-radius: 100px;
		background: var(--RED, #ff5656);

		/* text/Regular 12pt */
		max-width: 21px;
		color: var(--Foundation-Gray-white, #fff);
		text-align: center;

		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 140%; /* 16.8px */
		letter-spacing: 0.24px;
	}
`;
