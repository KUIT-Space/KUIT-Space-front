import TopBarText, { LeftEnum } from "@/components/TopBarText";

import * as s from "@/pages/QRPage/QRPage.styled";
import { CreateBtn } from "../VoiceRoomPage/JoinVoiceRoom.styled";
import { GradientBtn } from "../PayPage/GradientBtn";
import ReactIcon from "@/assets/react.svg";
import QRDelete from "@/assets/QR/qr_delete.svg";
import { RowFlexDiv } from "../HomePage/HomePage.styled";
import QREdit from "@/assets/QR/qr_edit.svg";
import { BottomFloatBtn } from "@/components/BottomFloatBtn";
import QRCreateIcon from "@/assets/QR/qr_create.svg";

const QRAttendWrapper = () => {
  const temp = 1;
  return (
    <s.QRAttendWrapper>
      <img src={ReactIcon} width={"60px"} height={"60px"} />
      <s.QRAttendDiv>
        <s.QRAttendTitle>Git 세션</s.QRAttendTitle>
        <RowFlexDiv>
          <s.QRAttendContent1>현재 참가 인원</s.QRAttendContent1>
          <s.QRAttendContent2>{temp}</s.QRAttendContent2>
          <s.QRAttendContent1>명</s.QRAttendContent1>
        </RowFlexDiv>
        <s.QRAttendDate>2025.03.03</s.QRAttendDate>
      </s.QRAttendDiv>
      <s.QRAttendDelete src={QRDelete} />
      <s.QRAttendEdit src={QREdit} />
    </s.QRAttendWrapper>
  );
};
const QRHome = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center={"QR 출석 관리"} right={<></>} />
      <s.QRHomeContainer>
        <s.QRAttendContainer>
          <QRAttendWrapper />
          <QRAttendWrapper />
          <QRAttendWrapper />
        </s.QRAttendContainer>
        <BottomFloatBtn>
          <img src={QRCreateIcon}></img>
          <div>QR 생성하기</div>
        </BottomFloatBtn>
      </s.QRHomeContainer>
    </>
  );
};

export default QRHome;
