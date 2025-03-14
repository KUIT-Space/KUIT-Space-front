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
  const { data } = useEventQuery(1, Number(id), { refetchInterval: 10000 });
  if (data == undefined) return <></>;

  const participants = data.result?.participants;
  if (participants == undefined) return <></>;
  const cnt = participants.length;

  const downloadData = (url: string, fileName: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch(console.error);
  };
  const downloadQRHandler = (name: string | undefined) => {
    const qrRef = document.getElementById("qrcode-svg");
    if (qrRef === null) {
      alert("다운로드 과정에 문제가 발생하였습니다. 개발팀에 문의바랍니다");
      return;
    }
    const _qrRef = qrRef;
    _qrRef.setAttribute("width", "1024");
    _qrRef.setAttribute("height", "1024");
    const serializer = new XMLSerializer();
    const url =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        '<?xml version="1.0" standalone="no"?>' + serializer.serializeToString(_qrRef),
      );

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    const img = new Image();
    const ctx = canvas.getContext("2d");
    img.src = url;
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      downloadData(pngUrl, name + ".png");
    };
    _qrRef.setAttribute("width", "188");
    _qrRef.setAttribute("height", "188");
  };

  const onDownloadClick = () => {
    downloadQRHandler(data.result?.name);
  };

  return (
    <>
      <TopBarText left={LeftEnum.Back} center={`${data.result?.name} 출석`} right={<></>} />
      <s.QRImgContainer>
        <QRCodeSVG value={url} size={188} marginSize={1} id="qrcode-svg" />
      </s.QRImgContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.625rem",

          marginTop: "0.5rem",
        }}
      >
        <RowFlexDiv style={{ alignItems: "end", width: "5rem" }} onClick={onDownloadClick}>
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
