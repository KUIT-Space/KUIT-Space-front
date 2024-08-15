import styled from "styled-components";
import CheckIcon from "@/assets/ChatPage/icon_checkbox.svg";
import CheckedIcon from "@/assets/ChatPage/icon_checkbox_checked.svg";

const StyledCheckBox = styled.div`
	input[type="checkbox"] {
		appearance: none;
		-webkit-appearance: none;

		margin: 0;
		background-image: url(${CheckIcon});
		background-repeat: no-repeat;
		background-position: center;
		width: 1.5rem;
		height: 1.5rem;

		cursor: pointer;
	}
	input[type="checkbox"]:checked {
		background-image: url(${CheckedIcon});
		background-repeat: no-repeat;
		background-size: 1.25rem 1.25rem;
		background-position: center;
		width: 1.5rem;
		height: 1.5rem;
	}
`;

const CheckBox = ({ checked, defaultChecked, onClick }: { checked?: boolean; defaultChecked?: boolean; onClick?: () => void }) => {
	return (
		<StyledCheckBox>
			<input type="checkbox" defaultChecked={defaultChecked} checked={checked} onClick={onClick} readOnly />
		</StyledCheckBox>
	);
};

export default CheckBox;
