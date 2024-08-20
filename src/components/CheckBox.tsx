import { useState } from "react";
import styled from "styled-components";

import CheckIcon from "@/assets/ChatPage/icon_checkbox.svg?react";
import CheckedIcon from "@/assets/ChatPage/icon_checkbox_checked.svg?react";

const StyledCheckBoxContainer = styled.div`
  display: flex;
`;

// const StyledCheckBox = styled.div`
//   input[type="checkbox"] {
//     appearance: none;
//     -webkit-appearance: none;

//     margin: 0;
//     background-repeat: no-repeat;
//     background-position: center;
//     width: 1.5rem;
//     height: 1.5rem;

//     cursor: pointer;
//   }
//   input[type="checkbox"]:checked {
//     background-repeat: no-repeat;
//     background-size: 1.25rem 1.25rem;
//     background-position: center;
//     width: 1.5rem;
//     height: 1.5rem;
//   }
// `;

const StyledCheckIcon = styled(CheckedIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledNonCheckIcon = styled(CheckIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const CheckBox = ({
  checked,
  defaultChecked,
  onClick,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: () => void;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(defaultChecked || checked || false);

  const handleClick = () => {
    onClick && onClick();
    setIsSelected((prev) => !prev);
  };

  return (
    <StyledCheckBoxContainer>
      {/* <StyledCheckBox>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          checked={checked}
          onClick={onClick}
          readOnly
        />
      </StyledCheckBox> */}
      {(checked ?? isSelected) ? (
        <StyledCheckIcon onClick={handleClick} />
      ) : (
        <StyledNonCheckIcon onClick={handleClick} />
      )}
    </StyledCheckBoxContainer>
  );
};

export default CheckBox;
