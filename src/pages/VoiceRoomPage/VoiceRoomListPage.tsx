import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { VrListApi } from "@/apis/voiceroomApi";
import plus from "@/assets/VoiceRoom/icon_plus.svg";
import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/VoiceRoomListPage.styled";
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
    <div style={{ marginBottom: "0.75rem" }}>
      <s.BGdiv
        onClick={() => {
          navigate("/joinvoiceroom", { state: vrList });
        }}
      >
        <s.VRTitleDiv> {vrList.name} </s.VRTitleDiv>
        <s.InfoDiv>
          <s.RoundDiv style={{ padding: "0.5rem" }}>
            대화 중인 스페이서 {vrList.numParticipant}명
          </s.RoundDiv>
          {vrList.numParticipant === 0 ? (
            <></>
          ) : (
            <s.DropdownDiv>
              {vrList.participantInfoList !== null &&
                vrList.participantInfoList.map((value, index) => (
                  <VoiceRoomUser props={value} key={index} />
                ))}
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
  const [isLoading, setIsLoading] = useState(false);

  const filterVrList = () => {
    let tmp1: VrList[] = [];
    let tmp2: VrList[] = [];
    vrList?.map((value, index) => {
      {
        value.active ? (tmp1 = [...tmp1, value]) : (tmp2 = [...tmp2, value]);
      }
    });
    setActiveVrList([...tmp1]);
    setInActiveVrList([...tmp2]);
  };

  useEffect(() => {
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      setIsLoading(true);
      VrListApi(Number.parseInt(spaceId), setVrList);
    }
    //space ID
  }, []);

  useEffect(() => {
    if (vrList?.length !== 0) {
      filterVrList();
    } else {
      setIsLoading(false);
    }
  }, [vrList]);

  useEffect(() => {
    if (inactiveVrList?.length !== 0 || activeVrList?.length !== 0) {
      setIsLoading(false);
    }
  }, [activeVrList, inactiveVrList]);

  const navigate = useNavigate();
  const onClickInActiveVrRoom = (vrInfo: VrList) => {
    navigate("/joinvoiceroom", { state: vrInfo });
  };

  return isLoading ? (
    <>{isLoading}</>
  ) : (
    <>
      <TopBarText
        left={LeftEnum.Logo}
        center="보이스룸"
        right="편집"
        rightHandler={() => {
          navigate("/editvoiceroom");
        }}
      />
      <div style={{ margin: "1rem 1.25rem 0rem 1.25rem" }}>
        <s.ActiveP style={{ marginBottom: "0.75rem" }}> 활동 중인 보이스룸 </s.ActiveP>
        {activeVrList?.length == 0 ? (
          <s.NoAlertDiv>활동 중인 보이스룸이 없어요!</s.NoAlertDiv>
        ) : (
          <>
            {activeVrList?.map((value, index) => (
              <VoiceRoomPortal key={value.id} vrList={value}></VoiceRoomPortal>
            ))}
          </>
        )}

        <s.ActiveP style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
          {" "}
          아무도 없어요!{" "}
        </s.ActiveP>
        {inactiveVrList?.length == 0 ? (
          <s.NoAlertDiv>조용한 보이스룸이 없어요!</s.NoAlertDiv>
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
              <img src={plus} style={{ marginRight: "0.5rem" }} alt="plus" />
              새로 만들기
            </div>
          </s.StyledButton>
        </div>
      </div>
    </>
  );
};

export default VoiceRoomListPage;
