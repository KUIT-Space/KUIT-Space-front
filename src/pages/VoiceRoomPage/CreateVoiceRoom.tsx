import TopBarText from "@/components/TopBarText";
import { LeftEnum } from "@/components/TopBarText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "@/pages/VoiceRoomPage/CreateVoiceRoomPage.styled";

import { BottomBtn } from "@/components/BottomBtn";
import { VrCreateApi } from "@/apis/voiceroomApi";
s;

const CreateVoiceRoomPage = () => {
  const [spaceName, setSpaceName] = useState("");

  const navigate = useNavigate();

  function handleSpaceName(e: any) {
    const value = e.target.value;
    setSpaceName(value);
    console.log({ spaceName });
  }
  const handleOnClick = () => {
    const spaceId = localStorage.getItem("spaceId");
    if (spaceId !== null) {
      VrCreateApi(Number.parseInt(spaceId), spaceName);
    }
    navigate("/voiceroom");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TopBarText left={LeftEnum.Back} center="새 보이스룸" right=""></TopBarText>
      <s.ContentDiv>
        <s.TitleDiv>이름</s.TitleDiv>
        <s.InputName
          id="inputName"
          type="text"
          placeholder="보이스룸 이름"
          onChange={handleSpaceName}
        />
      </s.ContentDiv>
      <BottomBtn disabled={spaceName === "" ? true : false} onClick={handleOnClick}>
        생성하기
      </BottomBtn>
    </div>
  );
};

export default CreateVoiceRoomPage;
