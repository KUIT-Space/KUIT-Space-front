import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import right_arrow from "@/assets/Space/icon_right_arrow.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import NotDevelopModal from "@/utils/NotDevelopModal";

const Name = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const Id = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const Password = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
`;

const AccountManage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="계정 정보" right="" />
      <div style={{ margin: "0rem 1.25rem 0rem 1.25rem", cursor: "pointer" }}>
        <Name onClick={() => setIsOpen(true)}>
          이름 변경
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Name>
        <Id onClick={() => setIsOpen(true)}>
          아이디 변경
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Id>
        <Password onClick={() => setIsOpen(true)}>
          비밀번호 변경
          <img style={{ display: "absolute", right: "0" }} src={right_arrow} alt="right_arrow" />
        </Password>
      </div>
      <NotDevelopModal isModalOpen={isOpen} setIsModalOpen={setIsOpen} />
    </div>
  );
};

export default AccountManage;
