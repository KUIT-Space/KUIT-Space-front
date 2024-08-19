import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
import { VrListApi } from "@/apis/voiceroomApi";
import { VoiceRoomUser } from "@/pages/VoiceRoomPage/VoiceRoomUser";

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
            <></>
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
  const [activeVrList, setActiveVrList] = useState<VrList[] | undefined>([]);
  const [inactiveVrList, setInActiveVrList] = useState<VrList[] | undefined>([]);

  const filterVrList = () => {
    vrList?.map((value, index) => {
      {
        value.active
          ? setActiveVrList((activeVrList) => [...(activeVrList || []), value])
          : setInActiveVrList((inactiveVrList) => [...(inactiveVrList || []), value]);
      }
    });
  };

  useEffect(() => {
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      VrListApi(Number.parseInt(spaceId), setVrList);
    }
    //space ID
  }, []);

  useEffect(() => {
    filterVrList();
  }, [vrList]);

  const navigate = useNavigate();
  const onClickInActiveVrRoom = (vrInfo: VrList) => {
    navigate("/joinvoiceroom", { state: vrInfo });
  };

  return (
    <>
      <TopBarText
        left={LeftEnum.Logo}
        center="보이스룸"
        right="편집"
        rightHandler={() => {
          navigate("/editvoiceroom");
        }}
      />
      <div style={{ marginLeft: "1.25rem", marginRight: "1.25rem" }}>
        <s.ActiveP> 활동 중인 보이스룸 </s.ActiveP>
        {activeVrList?.length == 0 ? (
          <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
        ) : (
          <div>
            {activeVrList?.map((value, index) => {
              return <VoiceRoomPortal key={value.id} vrList={value}></VoiceRoomPortal>;
            })}
          </div>
        )}

        <s.ActiveP> 아무도 없어요! </s.ActiveP>
        {inactiveVrList?.length == 0 ? (
          <s.NoAlertDiv>요청한 정산이 없어요!</s.NoAlertDiv>
        ) : (
          <div>
            {inactiveVrList?.map((value, index) => {
              return (
                <s.RoundDiv2
                  key={value.id}
                  onClick={() => {
                    onClickInActiveVrRoom(value);
                  }}
                >
                  {value.name}
                </s.RoundDiv2>
              );
            })}
          </div>
        )}
        <div>
          <s.StyledButton>
            <div
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              onClick={() => {
                navigate("/createvoiceroom");
              }}
            >
              <img src={plus} style={{ marginRight: "0.5rem" }} />
              새로 만들기
            </div>
          </s.StyledButton>
        </div>
      </div>
    </>
  );
};

export default VoiceRoomListPage;
