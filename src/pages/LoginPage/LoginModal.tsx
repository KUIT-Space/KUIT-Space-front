import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import StopModal from "@/components/StopModal";

export const LoginModal = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      return;
    }

    const token = localStorage.getItem("Authorization");

    if (!token) {
      setIsModalOpen(true);
    }
  }, [navigate, location.pathname]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StopModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onConfirm={() => {
        navigate("/login");
        setIsModalOpen(false);
      }}
      title={"로그인이 필요합니다."}
      content={["로그인 페이지로 이동하시겠어요?"]}
      contentColor="#767681"
      confirmButtonColor="#48FFBD"
      cancelButtonText="취소"
      confirmButtonText="확인"
      confirmButtonTextColor="#171719"
    />
  ); // 조건이 충족되면 자식 컴포넌트를 렌더링
};

export default LoginModal;
