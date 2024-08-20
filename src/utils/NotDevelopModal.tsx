import { useState } from "react";

import StopModal from "@/components/StopModal";

interface ModalType {
  title?: string;
  content?: string[];
}

export const NotDevelopModal = ({ title, content }: ModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StopModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={() => {
        // navigate("/login");
        setIsModalOpen(false);
      }}
      title={"💻  공사 중  💻"}
      content={["아직 개발 중인 페이지에요", "조금만 기다려 주세요"]}
      contentColor="#767681"
      confirmButtonColor="#48FFBD"
      cancelButtonText="취소"
      confirmButtonText="확인"
      confirmButtonTextColor="#171719"
    />
  );
};

export default NotDevelopModal;
