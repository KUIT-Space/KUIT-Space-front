import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QRCodeSVG } from "qrcode.react";

import { useAddEventParticipants, useEventQuery, useRemoveEventParticipants } from "@/apis/event";
import { useAllMembersQuery } from "@/apis/SpaceMember";
import addMemberIcon from "@/assets/ChatPage/btn_add_member.svg";
import AttendRemove from "@/assets/QR/attend_remove.svg";
import QRDownIcon from "@/assets/QR/qr_down.svg";
import QRShareIcon from "@/assets/QR/qr_share.svg";
import { BottomBtn } from "@/components/BottomBtn";
import { MemberCheck } from "@/components/MemberCheck";
import TopBarText, { LeftEnum } from "@/components/TopBarText";
import { SPACE_ID } from "@/utils/constants";

import { Member } from "../ChatPage/ChatCreatePage/ChatCreatePage.styled";
import { RowFlexDiv } from "../PayPage/PayPage.styled";
import { copyToClipboard } from "../PayPage/ReqDataDiv";

import * as s from "./QRPage.styled";

import "react-toastify/dist/ReactToastify.css";

const QRDetail = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const { id } = useParams();
  const { data } = useEventQuery(SPACE_ID, Number(id), { refetchInterval: 10000 });
  const members = useAllMembersQuery(SPACE_ID);

  const { mutate: addEventParticipants } = useAddEventParticipants(SPACE_ID, Number(id));
  const { mutate: removeEventParticipants } = useRemoveEventParticipants(SPACE_ID, Number(id));
  const url = window.location.origin + `/KUIT-Space-front/qr/${id}`;
  const [mode, setMode] = useState<boolean>(false);

  if (data == undefined) return <>에러 발생</>;

  const participants = data.result?.participants;
  if (participants == undefined) return <>에러 발생</>;
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

  const onShareClick = () => {
    try {
      copyToClipboard(url);
    } catch (e) {
      alert(e);
    }
  };

  const onRemoveAttendClick = (id: number) => {
    const arr: number[] = [];
    arr.push(id);
    removeEventParticipants(arr);
  };
  const onAddAttendClick = () => {
    addEventParticipants(selected);
    changeMode();
  };
  const changeMode = () => {
    setMode(!mode);
  };
  const onSelected = (id: number) => {
    // 이미 있는 id는 지운다
    if (
      selected.find((e) => {
        if (e === id) {
          setSelected((prev) => prev.filter((e) => e !== id));
          return true;
        }
      }) === undefined
    ) {
      setSelected((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <ToastContainer />
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
        <RowFlexDiv
          style={{ alignItems: "end", width: "5rem", cursor: "pointer" }}
          onClick={onDownloadClick}
        >
          <img src={QRDownIcon}></img>
          <div>다운로드</div>
        </RowFlexDiv>
        <RowFlexDiv
          onClick={onShareClick}
          style={{ alignItems: "end", width: "5rem", cursor: "pointer" }}
        >
          <img src={QRShareIcon}></img>
          <div>공유</div>
        </RowFlexDiv>
      </div>
      {mode ? (
        <>
          <s.QRAttendListDiv>
            <s.QRAttendListContainer>
              {members.data.result?.spaceMemberDetails.map((value) => {
                return (
                  <MemberCheck
                    key={value.spaceMemberId}
                    info={value}
                    onClick={() => {
                      onSelected(value.spaceMemberId);
                    }}
                  />
                );
              })}
            </s.QRAttendListContainer>
          </s.QRAttendListDiv>
          <BottomBtn onClick={onAddAttendClick}>추가 완료 {selected.length}</BottomBtn>
        </>
      ) : (
        <s.QRAttendListDiv>
          <s.QRAttendListContainer>
            <RowFlexDiv style={{ gap: "0.25rem", alignItems: "baseline" }}>
              <div>참가 멤버</div>
              <s.QRAttendContent2>{cnt}</s.QRAttendContent2>
            </RowFlexDiv>
            <RowFlexDiv
              style={{
                width: "100%",
                flexGrow: 1,
                alignItems: "center",
                padding: "0.5rem 0.25rem",
                cursor: "pointer",
              }}
              onClick={onAddAttendClick}
            >
              <img src={addMemberIcon}></img>
              <div style={{ paddingLeft: "1rem" }}>인원 추가</div>
            </RowFlexDiv>
            {participants.map((value) => {
              return (
                <RowFlexDiv key={value.id} style={{ width: "100%", flexGrow: 1 }}>
                  <Member $cursor="default" style={{ width: "100%", flexGrow: 1 }}>
                    <section>
                      <img src={value.profileImageUrl} />
                      <span className="name">{value.name}</span>
                    </section>
                  </Member>
                  <img
                    src={AttendRemove}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onRemoveAttendClick(value.id);
                    }}
                  ></img>
                </RowFlexDiv>
              );
            })}
          </s.QRAttendListContainer>
        </s.QRAttendListDiv>
      )}
    </>
  );
};

export default QRDetail;
