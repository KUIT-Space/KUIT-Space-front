import { BottomBtn } from "@/components/BottomBtn";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ColumnFlexDiv } from "../HomePage/HomePage.styled";
import * as s from "@/pages/QRPage/QRPage.styled";

import tmp from "@/assets/react.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, getEvents, useEventQuery, useEventsQuery } from "@/apis/event";

const QRPage = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [src, setSrc] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();
  const onAttendClick = () => {
    // Toast 메시지 띄우자
    navigate("/");
  };

  const { data } = useEventQuery(1, Number(id));
  useEffect(() => {
    if (data.result == undefined) {
      return;
    }
    setTitle(data.result.name);
    setSrc(data.result.image);
    setDate(data.result.date);
  }, []);

  return (
    <div>
      <TopBarText left={LeftEnum.Back} center={"QR 출석"} right={<></>}></TopBarText>
      <s.Container>
        <s.ImgQR src={src}></s.ImgQR>
        <s.TitleDiv>{title}</s.TitleDiv>
        <s.DateDiv>{date}</s.DateDiv>
      </s.Container>
      <BottomBtn onClick={onAttendClick}>출석하기</BottomBtn>
    </div>
  );
};

export default QRPage;
