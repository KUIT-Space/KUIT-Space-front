import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import testIcon from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";
import TimePicker from "@/components/TimePicker";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import camera from "@/assets/Space/icon_camera.svg";
import { useCreateEvent } from "@/apis/event";
import { SPACE_ID } from "@/utils/constants";

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
  margin: 0 3rem;
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
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

const CreateBtn = styled(BottomBtn)`
  padding: 1.25rem;
`;
const InputText = styled.input`
  border-radius: 0.75rem;
  background: var(--Foundation-Gray-gray800, #171719);

  border: none;
  padding: 1rem 0.25rem;

  /* text/Regular 16pt */
  font-family: Freesentation;
  font-size: 1.5rem;
  &:focus {
    outline: none;
    box-shadow: 0rem 0rem 0.25rem var(--Foundation-Main-color-Normal, #48ffbd);
  }
`;
const ChooseImgBtn = styled.label<{ $backgroundImage: string | null }>`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 160px;
  justify-content: center;
  border-radius: 12px;
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) no-repeat center`
      : "var(--Foundation-Gray-gray500, #767681)"};

  background-size: cover;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }
`;
interface QRCreateInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const QRCreateInput: React.FC<QRCreateInputProps> = ({ onChange }) => {
  return <InputText type="text" onChange={onChange} placeholder="제목을 입력해주세요." />;
};

const QRCreate = () => {
  const { mutate: createEvent } = useCreateEvent(SPACE_ID);
  const maxChars = 12;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  let title = "";
  const navigate = useNavigate();
  const onCreateClick = () => {
    const eventData = {
      name: title,
      image: uploadedImage,
      date: startDate?.toISOString()!,
      startTime: "2025-03-26T12:13:39.238Z",
      endTime: "2025-03-26T12:13:39.238Z",
    };
    createEvent(eventData);
    navigate("/qr/home");
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      title = value;
      console.log(title);
    }
  };
  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    image && setUploadedImage(image);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const days = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
  const day = days[today.getDay()];
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="QR 출석" right=""></TopBarText>
      <ImgContainer>
        <ChooseImgBtn
          $backgroundImage={uploadedImage !== null ? URL.createObjectURL(uploadedImage) : null}
        >
          <img src={camera} alt="camera" />
          <input type="file" accept="image/*" onChange={handleImageImport} />
        </ChooseImgBtn>
      </ImgContainer>
      <InputContainer>
        <QRCreateInput onChange={handleInputChange} />

        <Divider />
        <Today>
          <DatePicker
            dateFormat="yyyy.MM.dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            shouldCloseOnSelect
          ></DatePicker>
        </Today>
        <Divider />
        {/* <TimeContainer>
          시작 시간
          <TimePicker initialPeriod="오전" initialHour="09" initialMinute="00" />
        </TimeContainer>
        <Divider />
        <TimeContainer>
          종료 시간
          <TimePicker initialPeriod="오후" initialHour="06" initialMinute="00" />
        </TimeContainer> */}
      </InputContainer>
      <CreateBtn onClick={onCreateClick}>출석 생성</CreateBtn>
    </>
  );
};

export default QRCreate;
