import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import yellow from "@/assets/VoiceRoom/yellow_gradient.svg";
import purple from "@/assets/VoiceRoom/purple_gradient.svg";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
import VoiceRoomUser from "./VoiceRoomUser";
import { VrListApi } from "@/apis/voiceroomApi";

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

function voiceRoomList() {
  const checkHandler = () => {
    //fetch list
  };
}

const VoiceRoomPortal = ({ vrList }: { vrList: VrList }) => {
  const navigate = useNavigate();
  return (
    <div>
      <s.BGdiv
        onClick={() => {
          navigate("/joinvoiceroom");
        }}
      >
        <s.VRTitleDiv> {vrList.name} </s.VRTitleDiv>
        <s.InfoDiv>
          <s.RoundDiv>대화 중인 스페이서 {vrList.active}명</s.RoundDiv>
          <s.DropdownDiv>
            {/* {vrList === undefined ? (
            <div>dd</div>
          ) : (
            vrList.map((value, index) => {
              return <VoiceRoomUser key={value.id} props={value.participantInfoList} />;
            })
          )} */}
          </s.DropdownDiv>
        </s.InfoDiv>
      </s.BGdiv>
    </div>
  );
};
const VoiceRoomListPage = () => {
  const [vrList, setVrList] = useState<VrList[] | undefined>([]);
  const [vrUserInfo, setVrUserInfo] = useState<participantInfo[] | undefined>([]);
  useEffect(() => {
    VrListApi(3, setVrList);
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{}}>
      <TopBarText left={LeftEnum.Logo} center="보이스룸" right="" />
      <s.ActiveP> 활동 중인 보이스룸 </s.ActiveP>
      {vrList?.map((value, index) => {
        return <VoiceRoomPortal key={index} vrList={value}></VoiceRoomPortal>;
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
  );
};

export default VoiceRoomListPage;
