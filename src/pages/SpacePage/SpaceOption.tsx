import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { To, useNavigate } from "react-router-dom";
import { useState } from "react";
import right_arrow from "@/assets/Space/icon_right_arrow.svg";
import styled from "styled-components";
import StopModal from "@/components/StopModal";
import * as S from "@/components/StopModal.styled";

const Account = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const Alarm = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const Logout = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  cursor: pointer;
`;

const Withdraw = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  color: ${({ theme }) => theme.colors.char_red};
  cursor: pointer;
`;

const SpaceOption = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogoutModal = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem("Authorization");
    navigate("/login");
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleConfirmWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
    navigate("/login");
  };

  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="전체 설정" right="" />
      <div style={{ margin: "0rem 1.25rem 0rem 1.25rem" }}>
        <Account onClick={() => handleNavigate("/space/spaceoption/accountmanage")}>
          계정 정보
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Account>
        <Profile onClick={() => handleNavigate("/space/spaceoption/profilemanage")}>
          프로필 관리
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Profile>
        <Alarm onClick={() => handleNavigate("/space/spaceoption/alarmmanage")}>
          알림 관리
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Alarm>
        <Logout onClick={handleOpenLogoutModal}>로그아웃</Logout>
        <Withdraw onClick={handleOpenWithdrawModal}>탈퇴하기</Withdraw>
        <StopModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogoutModal}
          title="로그아웃"
          content={["로그아웃 하시겠어요?"]}
          contentColor="#767681"
          confirmButtonColor="#48FFBD"
          cancelButtonText="취소"
          confirmButtonText="확인"
          confirmButtonTextColor="#171719"
        />
        <StopModal
          isOpen={isWithdrawModalOpen}
          onClose={handleCloseWithdrawModal}
          onConfirm={handleConfirmWithdrawModal}
          title="탈퇴하기"
          content={["탈퇴하면 현재 가입중인", "모든 스페이스에서 탈퇴돼요."]}
          contentColor="#767681"
          confirmButtonColor="#FF5656"
          cancelButtonText="취소"
          confirmButtonText="탈퇴하기"
          confirmButtonTextColor="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default SpaceOption;
