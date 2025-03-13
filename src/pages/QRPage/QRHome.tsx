import TopBarText, { LeftEnum } from "@/components/TopBarText";

import * as s from "@/pages/QRPage/QRPage.styled";
import ReactIcon from "@/assets/react.svg";
import QRDelete from "@/assets/QR/qr_delete.svg";
import { RowFlexDiv } from "../HomePage/HomePage.styled";
import QREdit from "@/assets/QR/qr_edit.svg";
import { BottomFloatBtn } from "@/components/BottomFloatBtn";
import QRCreateIcon from "@/assets/QR/qr_create.svg";
import { ReadEventInfoResponse, useEventsQuery } from "@/apis/event";
import { useNavigate } from "react-router-dom";

const QRAttendWrapper = ({ event }: { event: ReadEventInfoResponse }) => {
  const navigate = useNavigate();
  const onQRClick = () => {
    navigate(`/qr/detail/${event.id}`);
  };
  return (
    <s.QRAttendWrapper onClick={onQRClick}>
      <img src={ReactIcon} width={"60px"} height={"60px"} />
      <s.QRAttendDiv>
        <s.QRAttendTitle>{event.name}</s.QRAttendTitle>
        <RowFlexDiv>
          <s.QRAttendContent1>현재 참가 인원&nbsp;</s.QRAttendContent1>
          <s.QRAttendContent2>
            {!event.participants ? 0 : event.participants.length}
          </s.QRAttendContent2>
          <s.QRAttendContent1>명</s.QRAttendContent1>
        </RowFlexDiv>
        <s.QRAttendDate>{event.date}</s.QRAttendDate>
      </s.QRAttendDiv>
      <s.QRAttendDelete src={QRDelete} />
      <s.QRAttendEdit src={QREdit} />
    </s.QRAttendWrapper>
  );
};
const QRHome = () => {
  const { data } = useEventsQuery(1);

  if (data.result == undefined) {
    return;
  }
  const events = data.result.events;
  return (
    <>
      <TopBarText left={LeftEnum.Back} center={"QR 출석 관리"} right={<></>} />
      <s.QRHomeContainer>
        <s.QRAttendContainer>
          {events.map((value) => {
            return <QRAttendWrapper key={value.id} event={value} />;
          })}
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
