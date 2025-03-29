import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEventQuery, useJoinEvent } from "@/apis/event";
import PlaceholderIcon from "@/assets/KUIT.svg";
import { BottomBtn } from "@/components/BottomBtn";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/QRPage/QRPage.styled";
import { SPACE_ID } from "@/utils/constants";

const QRPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const { mutate: joinEvent } = useJoinEvent(SPACE_ID, Number(id));

  const navigate = useNavigate();
  const onAttendClick = () => {
    joinEvent();
    // Toast 메시지 띄우자
    navigate("/");
  };

  const { data } = useEventQuery(SPACE_ID, Number(id), { refetchInterval: 10000 });
  useEffect(() => {
    if (data.result == undefined) {
      return;
    }
    setTitle(data.result.name);
    setSrc(data.result.image);
    setDate(data.result.date);
  }, [data.result]);

  const onImageErr: React.ReactEventHandler<HTMLImageElement> = (e) => {
    (e.target as HTMLImageElement).src = PlaceholderIcon;
  };
  return (
    <div>
      <TopBarText left={LeftEnum.Back} center={"QR 출석"} right={<></>}></TopBarText>
      <s.Container>
        <s.ImgQR src={src} onError={onImageErr}></s.ImgQR>
        <s.TitleDiv>{title}</s.TitleDiv>
        <s.DateDiv>{date}</s.DateDiv>
      </s.Container>
      <BottomBtn onClick={onAttendClick}>출석하기</BottomBtn>
    </div>
  );
};

export default QRPage;
