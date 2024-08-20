import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import StopModal from "@/components/StopModal";

export const LoginModal = ({ exceptionRouters }: { exceptionRouters: string[] }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);

  useEffect(() => {
    if (exceptionRouters.includes(location.pathname)) {
      return;
    }

    const token = localStorage.getItem("Authorization");
    const spaceId = localStorage.getItem("spaceId");

    if (!token) {
      setIsModalOpen(true);
    } else if (!spaceId) {
      if ("/space" === location.pathname) {
        return;
      }
      setIsSpaceModalOpen(true);
    }
  }, [navigate, location.pathname, exceptionRouters]);

  return (
    <>
      <StopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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

      <StopModal
        isOpen={isSpaceModalOpen}
        onClose={() => setIsSpaceModalOpen(false)}
        onConfirm={() => {
          navigate("/space");
          setIsSpaceModalOpen(false);
        }}
        title={"Space 선택이 필요합니다."}
        content={["Space 선택 페이지로 이동하시겠어요?"]}
        contentColor="#767681"
        confirmButtonColor="#48FFBD"
        cancelButtonText="취소"
        confirmButtonText="확인"
        confirmButtonTextColor="#171719"
      />
    </>
  );
};

export default LoginModal;
