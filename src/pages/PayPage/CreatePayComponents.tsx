import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import ReactImg from "@/assets/react.svg";
import { useState } from "react";

import * as s from "@/pages/PayPage/PayPage.styled";
import { ChatUserInfoInSpace } from "./CreateRequestPage";
import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
interface payChatDivtype {
  img: string;
  name: string;
  cnt: number;
}

const PayChatMemberDiv = ({ props }: { props: UserInfoInSpace }) => {
  const imgUrl = props.profileImgUrl === null ? undefined : props.profileImgUrl;
  return (
    <s.RowFlexDiv style={{ alignItems: "center" }}>
      <img style={{ width: "2.5rem", height: "2.5rem", marginLeft: "1.875rem" }} src={imgUrl} />
      <span className="name" style={{ marginLeft: "0.75rem" }}>
        {props.userName}
      </span>
      <CheckBox></CheckBox>
    </s.RowFlexDiv>
  );
};
export const PayChatDiv = ({ props }: { props: ChatUserInfoInSpace }) => {
  console.log(props);
  const [flag, setFlag] = useState(false);
  const controlFlag = () => {
    setFlag(!flag);
  };
  return (
    <s.ColumnFlexDiv>
      <Member>
        <section>
          <img src={props.imgUrl} />
          <span className="name">{props.chatRoomName}</span>
          <s.CountText className="count">{props.userList?.length}</s.CountText>
        </section>
        {flag ? (
          <CheckBox
            checked={true}
            onClick={() => {
              controlFlag();
            }}
          ></CheckBox>
        ) : (
          <CheckBox
            checked={false}
            onClick={() => {
              controlFlag();
            }}
          ></CheckBox>
        )}
      </Member>
      {props.userList?.map((value, index) => {
        return <PayChatMemberDiv props={value}></PayChatMemberDiv>;
      })}
    </s.ColumnFlexDiv>
  );
};
