import styled from "styled-components";

import checkModal from "@/assets/Board/check_modal.svg";

const BoardBottomModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const BoardBottomModalContent = styled.div`
  position: fixed;
  bottom: 0%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--Foundation-Gray-gray800, #222226);
  padding: 3rem 0 1.75rem 0;
  border-radius: 12px 12px 0px 0px;
`;

const BoardBottomModalItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0.875rem 0.625rem 1.25rem;
  color: var(--Foundation-Gray-gray500, #767681);
  /* regular/18pt */
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.045rem;

  &.board-bottom-modal-selected {
    color: var(--Foundation-Gray-white, #fff);
  }
`;

export type BoardBottomModalProps = {
  selectedOption: string;
  onSelect: React.Dispatch<string>;
  isOpen: boolean;
  onClose: () => void;
};

const BoardBottomModal = ({ selectedOption, onSelect, isOpen, onClose }: BoardBottomModalProps) => {
  if (!isOpen) return null;
  const buttonOptions = [
    { label: "전체", value: "all" },
    { label: "카페", value: "cafe" },
    { label: "맛집", value: "restaurant" },
  ];

  return (
    <BoardBottomModalBackdrop onClick={onClose}>
      <BoardBottomModalContent>
        {buttonOptions.map((option) => {
          const isSelcted = option.label === selectedOption;
          return (
            <BoardBottomModalItem
              key={option.value}
              className={isSelcted ? "board-bottom-modal-selected" : ""}
              onClick={() => onSelect(option.label)}
            >
              {option.label}
              {isSelcted && <img src={checkModal} />}
            </BoardBottomModalItem>
          );
        })}
      </BoardBottomModalContent>
    </BoardBottomModalBackdrop>
  );
};

export default BoardBottomModal;