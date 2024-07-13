import styled from "styled-components";

const AddChatButtonSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<circle cx="26" cy="26" r="26" fill="#48FFBD" className="circle" />
		<path d="M26 19V33M19 26H33" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const AddChatBtn = styled(AddChatButtonSVG)`
	cursor: pointer;
	border-radius: 100%;

	&:active .circle {
		fill: ${({ theme }) => theme.colors.normal_active};
	}
`;
