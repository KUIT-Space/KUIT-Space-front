import React, { ChangeEvent, useState } from "react";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import styled from "styled-components";
import testIcon from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";
import TimePicker from "@/components/TimePicker";
import { useNavigate } from "react-router-dom";

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0 55px;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.BG700};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputTitle = styled.input`
  width: 100%;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.BG900};
  padding: 0 50px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.BG800};
  margin: 12px 0;
`;

const Today = styled.div`
  width: 100%;
  font-size: 1.5rem;
  padding: 0 50px;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  font-size: 1.5rem;
`;

const CreateBtn = styled(BottomBtn)`
  padding: 20px;
`;

const QRCreate = () => {
  const maxChars = 12;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setTitle(value);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const days = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
  const day = days[today.getDay()];

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="QR 출석" right=""></TopBarText>
      <ImgContainer>
        <Thumbnail src={testIcon} alt="Thumbnail" />
      </ImgContainer>
      <InputContainer>
        <InputTitle type="text" onChange={handleInputChange} placeholder="제목을 입력해주세요." />
        <Divider />
        <Today>
          {year}.{month}.{date} {day}
        </Today>
        <Divider />
        <TimeContainer>
          시작 시간
          <TimePicker initialPeriod="오전" initialHour="09" initialMinute="00" />
        </TimeContainer>
        <Divider />
        <TimeContainer>
          도착 시간
          <TimePicker initialPeriod="오후" initialHour="06" initialMinute="00" />
        </TimeContainer>
      </InputContainer>
      <CreateBtn disabled={title === "" ? true : false} onClick={() => navigate("/qr")}>
        출석 생성
      </CreateBtn>
    </>
  );
};

export default QRCreate;
