import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEventQuery, useJoinEvent } from "@/apis/event";
import tmp from "@/assets/react.svg";
import { BottomBtn } from "@/components/BottomBtn";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/QRPage/QRPage.styled";

import { ColumnFlexDiv } from "../HomePage/HomePage.styled";

const QRPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const { mutate: joinEvent } = useJoinEvent(1, Number(id));

  const navigate = useNavigate();
  const onAttendClick = () => {
    joinEvent();
    // Toast 메시지 띄우자
    navigate("/");
  };

  const { data } = useEventQuery(1, Number(id), { refetchInterval: 10000 });
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
