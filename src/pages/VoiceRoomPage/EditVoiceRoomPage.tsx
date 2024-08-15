import TopBarText, { LeftEnum } from "@/components/TopBarText";
import * as s from "@/pages/VoiceRoomPage/EditVoiceRoomPage.styled";
import menu from "@/assets/VoiceRoom/icon_menu_icon.svg";
import clear from "@/assets/VoiceRoom/icon_delete_X.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VrListApi } from "@/apis/voiceroomApi";
import { VrList } from "@/pages/VoiceRoomPage/VoiceRoomListPage";

const EditVoiceRoomPage = () => {
  const [vrList, setVrList] = useState<VrList[] | undefined>([]);
  const [nameArr, setNameArr] = useState<string[]>([]);

  const navigator = useNavigate();

  //_name 바뀔 이름
  const editVrList = (index: number, _name: string) => {
    const nextVrList = vrList?.map((value, i) => {
      if (i === index) {
        let now = value;
        now.name = _name;
        return now;
      } else {
        return value;
      }
    });
    setVrList(nextVrList);
  };
  const rightClickHandler = () => {
    console.log(vrList);
    //api 보내기
    //navigator("/voiceroom");
  };

  const EditVoiceRoomDiv = ({ vrList, i }: { vrList: VrList; i: number }) => {
    const [name, setName] = useState(vrList.name);

    const onClearHandler = () => {
      setName("");
      editVrList(i, "");
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      editVrList(i, e.target.value);
    };

    return (
      <s.InnerContentDiv>
        <s.IconImg src={menu}></s.IconImg>
        <s.NameDiv>
          <s.NameInput value={name} onChange={onChangeHandler}></s.NameInput>
          <s.ClearImg src={clear} onClick={onClearHandler}></s.ClearImg>
        </s.NameDiv>
      </s.InnerContentDiv>
    );
  };

  useEffect(() => {
    VrListApi(3, setVrList);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <TopBarText
        left={LeftEnum.None}
        center="보이스룸"
        right="완료"
        rightHandler={rightClickHandler}
      />
      <s.TitleDiv>보이스룸 목록</s.TitleDiv>
      <s.ContentDiv>
        {vrList?.map((value, index) => {
          return <EditVoiceRoomDiv key={value.id} vrList={value} i={index}></EditVoiceRoomDiv>;
        })}
      </s.ContentDiv>
    </div>
  );
};

export default EditVoiceRoomPage;
