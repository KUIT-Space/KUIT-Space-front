import { useState } from "react";

import StopModal from "@/components/Modal";

interface ModalType {
  title?: string;
  content?: string[];
}

export const NotDevelopModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //const [isModalOpen, setIsModalOpen] = useState(false);

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
      leftButtonText="취소"
      rightButtonText="확인"
      leftButtonColor="gray"
      rightButtonColor="#48FFBD"
      rightButtonTextColor="#171719"
    />
  );
};

export default NotDevelopModal;
