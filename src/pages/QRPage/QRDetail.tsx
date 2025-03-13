import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "./QRPage.styled";
import { QRCodeSVG } from "qrcode.react";
import QRDownIcon from "@/assets/QR/qr_down.svg";
import QRShareIcon from "@/assets/QR/qr_share.svg";
import { RowFlexDiv } from "../PayPage/PayPage.styled";
import { Member } from "../ChatPage/ChatCreatePage/ChatCreatePage.styled";

import ReactIcon from "@/assets/react.svg";
const QRDetail = () => {
  return (
    <>
      <TopBarText left={LeftEnum.Back} center="세션 이름 출석" right={<></>} />
      <s.QRImgContainer>
        <QRCodeSVG value={"https://naver.com"} size={188} marginSize={1} />
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
            <s.QRAttendContent2>{3}</s.QRAttendContent2>
          </RowFlexDiv>
          <Member $cursor="default">
            <section>
              <img
                // src={member.profileImgUrl ?? getUserDefaultImageURL(member.userId)}
                src={ReactIcon}
                alt="member profile img"
              />
              <span className="name">유저 이름</span>
            </section>
          </Member>
        </s.QRAttendListContainer>
      </s.QRAttendListDiv>
    </>
  );
};

export default QRDetail;
