import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 44px;
    height: 24px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.BG500};
  }
  // .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: ${({ theme }) => theme.colors.normal};
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.5s;
  }

  > .toggle--checked.toggle-circle {
    left: 22px;
    transition: 0.5s;
  }
`;

// Props 타입 지정
interface ToggleBtnProps {
  isOn: boolean;
  onToggle: () => void;
}

export const ToggleBtn: React.FC<ToggleBtnProps> = ({ isOn, onToggle }) => {
  return (
    <ToggleContainer onClick={onToggle}>
      <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
      <div className={`toggle-circle ${isOn ? "toggle--checked toggle-circle" : ""}`} />
    </ToggleContainer>
  );
};
