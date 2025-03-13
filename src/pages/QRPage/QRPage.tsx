import { BottomBtn } from "@/components/BottomBtn";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { ColumnFlexDiv } from "../HomePage/HomePage.styled";
import * as s from "@/pages/QRPage/QRPage.styled";

import tmp from "@/assets/react.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const QRPage = () => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();
  const onAttendClick = () => {
    // Toast 메시지 띄우자
    navigate("/");
  };

  useEffect(() => {
    // TODO 지우기
    localStorage.setItem(
      "Authorization",
      "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDE4NDk3MDksImV4cCI6MTc0MTk0OTcwOSwic3BhY2VNZW1iZXJJZCI6Niwic3BhY2VJZCI6MX0.Iu5MAp1cNZjiQkhSQwAidPXHUHV6qE8RRaiAHOlmauc",
    );
  }, []);
  return (
    <div>
      <TopBarText left={LeftEnum.Back} center={"QR 출석"} right={<></>}></TopBarText>
      <s.Container>
        <s.ImgQR src={tmp}></s.ImgQR>
        <s.TitleDiv>Git 세션</s.TitleDiv>
        <s.DateDiv>2024년 6월 20일</s.DateDiv>
      </s.Container>
      <BottomBtn onClick={onAttendClick}>출석하기</BottomBtn>
    </div>
  );
};

export default QRPage;
