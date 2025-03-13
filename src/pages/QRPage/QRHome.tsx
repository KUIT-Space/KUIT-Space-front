import TopBarText, { LeftEnum } from "@/components/TopBarText";

import * as s from "@/pages/QRPage/QRPage.styled";
import ReactIcon from "@/assets/react.svg";
import QRDelete from "@/assets/QR/qr_delete.svg";
import { RowFlexDiv } from "../HomePage/HomePage.styled";
import QREdit from "@/assets/QR/qr_edit.svg";
import { BottomFloatBtn } from "@/components/BottomFloatBtn";
import QRCreateIcon from "@/assets/QR/qr_create.svg";
import { ReadEventInfoResponse, getEvents, useDeleteEvent, useEventsQuery } from "@/apis/event";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

const QRAttendWrapper = ({
  event,
  handler,
}: {
  event: ReadEventInfoResponse;
  handler: (i: number) => void;
}) => {
  const navigate = useNavigate();
  const onQRClick = () => {
    navigate(`/qr/detail/${event.id}`);
  };

  const onDeleteClick = () => {
    handler(event.id);
  };

  const onModifyClick = () => {
    //navigate to modify
  };
  return (
    <s.QRAttendWrapper>
      <s.QRAttendDelete src={QRDelete} onClick={onDeleteClick} />
      <s.QRAttendEdit src={QREdit} />
      <RowFlexDiv style={{ gap: "0.625rem", cursor: "pointer" }} onClick={onQRClick}>
        <img src={event.image} width={"60px"} height={"60px"} />
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
      </RowFlexDiv>
    </s.QRAttendWrapper>
  );
};
const QRHome = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const { mutate: deleteEvent } = useDeleteEvent(1);
  const { data } = useEventsQuery(1);

  if (data.result == undefined) {
    return <></>;
  }
  const events: ReadEventInfoResponse[] = data.result.events;

  const togleModal = (i: number) => {
    setIsModal(!isModal);
    setIndex(i);
  };

  return (
    <>
      <Modal
        isOpen={isModal}
        title={"행사를 삭제하시겠습니까?"}
        content={[]}
        leftButtonText="취소"
        rightButtonText="삭제"
        leftButtonColor="#454548"
        rightButtonColor="#FF5656"
        rightButtonTextColor="#fff"
        onClose={() => {
          setIsModal(false);
        }}
        onConfirm={async () => {
          deleteEvent(index);
          setIsModal(false);
        }}
      />
      <TopBarText left={LeftEnum.Back} center={"QR 출석 관리"} right={<></>} />
      <s.QRHomeContainer>
        <s.QRAttendContainer>
          {events.map((value) => {
            return <QRAttendWrapper key={value.id} event={value} handler={togleModal} />;
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
