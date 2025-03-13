import { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import { useEventQuery } from "@/apis/event";
import QRDownIcon from "@/assets/QR/qr_down.svg";
import QRShareIcon from "@/assets/QR/qr_share.svg";
import ReactIcon from "@/assets/react.svg";
import TopBarText, { LeftEnum } from "@/components/TopBarText";

import { Member } from "../ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { RowFlexDiv } from "../PayPage/PayPage.styled";

import * as s from "./QRPage.styled";

const QRDetail = () => {
  const { id } = useParams();

  const url = window.location.origin + `/KUIT-Space-front/qr/${id}`;
  const { data } = useEventQuery(1, Number(id), { refetchInterval: 5000 });
  if (data == undefined) return <></>;

  const participants = data.result?.participants;
  if (participants == undefined) return <></>;
  const cnt = participants.length;

  return (
    <>
      <TopBarText left={LeftEnum.Back} center="세션 이름 출석" right={<></>} />
      <s.QRImgContainer>
        <QRCodeSVG value={url} size={188} marginSize={1} />
      </s.QRImgContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.625rem",

          marginTop: "0.5rem",
        }}
      >
        <RowFlexDiv style={{ alignItems: "end", width: "5rem" }}>
          <img src={QRDownIcon}></img>
          <div>다운로드</div>
        </RowFlexDiv>
        <RowFlexDiv style={{ alignItems: "end", width: "5rem" }}>
          <img src={QRShareIcon}></img>
          <div>공유</div>
        </RowFlexDiv>
      </div>
      <s.QRAttendListDiv>
        <s.QRAttendListContainer>
          <RowFlexDiv style={{ gap: "0.25rem", alignItems: "baseline" }}>
            <div>참가 멤버</div>
            <s.QRAttendContent2>{cnt}</s.QRAttendContent2>
          </RowFlexDiv>
          {participants.map((value) => {
            return (
              <Member key={value.id} $cursor="default">
                <section>
                  <img
                    // src={member.profileImgUrl ?? getUserDefaultImageURL(member.userId)}
                    src={value.profileImageUrl}
                    alt="member profile img"
                  />
                  <span className="name">{value.name}</span>
                </section>
              </Member>
            );
          })}
        </s.QRAttendListContainer>
      </s.QRAttendListDiv>
    </>
  );
};

export default QRDetail;
