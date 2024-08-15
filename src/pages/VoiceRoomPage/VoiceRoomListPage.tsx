import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
import { VrListApi } from "@/apis/voiceroomApi";
import { VoiceRoomUser } from "./VoiceRoomUser";

export type participantInfo = {
  name: string;
  profileImage: string;
  mute: boolean;
};

export type VrList = {
  active: boolean;
  id: number;
  name: string;
  numParticipant: number;
  order: number;
  participantInfoList: participantInfo[];
};

const VoiceRoomPortal = ({ vrList }: { vrList: VrList }) => {
  const navigate = useNavigate();
  return (
    <div>
      <s.BGdiv
        onClick={() => {
          navigate("/joinvoiceroom", { state: vrList });
        }}
      >
        <s.VRTitleDiv> {vrList.name} </s.VRTitleDiv>
        <s.InfoDiv>
          <s.RoundDiv>대화 중인 스페이서 {vrList.numParticipant}명</s.RoundDiv>
          {vrList.numParticipant === 0 ? (
            <div></div>
          ) : (
            <s.DropdownDiv>
              <VoiceRoomUser props={vrList.participantInfoList} />;
            </s.DropdownDiv>
          )}
        </s.InfoDiv>
      </s.BGdiv>
    </div>
  );
};
const VoiceRoomListPage = () => {
  const [vrList, setVrList] = useState<VrList[] | undefined>([]);

  useEffect(() => {
    VrListApi(3, setVrList);
    if (vrList == null) {
      setVrList([]);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <TopBarText left={LeftEnum.Logo} center="보이스룸" right="" />
      <div style={{ marginLeft: "1.25rem", marginRight: "1.25rem" }}>
        <s.ActiveP> 활동 중인 보이스룸 </s.ActiveP>
        {vrList?.map((value, index) => {
          {
            //여기 왜 삼항연산자 안 되지
            if (value.active == true) {
              return <VoiceRoomPortal key={index} vrList={value}></VoiceRoomPortal>;
            } else {
              return <></>;
            }
          }
        })}

        <s.ActiveP> 아무도 없어요! </s.ActiveP>
        <s.RoundDiv2>보이스룸 3</s.RoundDiv2>
        <s.RoundDiv2>보이스룸 4</s.RoundDiv2>
        <div>
          <s.StyledButton>
            <div
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              onClick={() => {
                navigate("/createvoiceroom");
              }}
            >
              <img src={plus} style={{ marginRight: "8px" }} />
              새로 만들기
            </div>
          </s.StyledButton>
        </div>
      </div>
    </>
  );
};

export default VoiceRoomListPage;
