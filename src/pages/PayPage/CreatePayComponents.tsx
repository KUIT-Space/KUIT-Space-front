import { useEffect, useState } from "react";

import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import * as s from "@/pages/PayPage/PayPage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";
import PlaceholderIcon from "@/assets/KUIT.svg";
import { ChatUserInfoInSpace } from "./CreateRequestPage";
import { ReadEventInfoResponse, ReadEventsInfoResponse } from "@/apis/event";
// interface payChatDivtype {
//   img: string;
//   name: string;
//   cnt: number;
// }

const PayChatMemberDiv = ({ info }: { info: UserInfoInSpace }) => {
  return (
    <s.RowFlexDiv style={{ alignItems: "center" }}>
      <img
        style={{ width: "2.5rem", height: "2.5rem", marginLeft: "1.875rem" }}
        src={info.profileImgUrl ?? getUserDefaultImageURL(info.userId)}
        alt="profile"
      />
      <span className="name" style={{ marginLeft: "0.75rem" }}>
        {info.userName}
      </span>
      <CheckBox></CheckBox>
    </s.RowFlexDiv>
  );
};

export const PayChatDiv = ({
  info,
  handler,
}: {
  info: ReadEventsInfoResponse;
  handler: (id: number) => void;
}) => {
  const [flag, setFlag] = useState(false);

  const controlFlag = () => {
    setFlag(!flag);
    handler(info.id);
  };
  const onImageErr: React.ReactEventHandler<HTMLImageElement> = (e) => {
    (e.target as HTMLImageElement).src = PlaceholderIcon;
  };
  return (
    <s.ColumnFlexDiv>
      <Member>
        <section>
          <img src={info.image} onError={onImageErr} alt="info img" />
          <span className="name">{info.name}</span>
          <s.CountText className="count">{info.totalNumberOfParticipants}</s.CountText>
        </section>
        {flag ? (
          <CheckBox checked={true} onClick={controlFlag}></CheckBox>
        ) : (
          <CheckBox checked={false} onClick={controlFlag}></CheckBox>
        )}
      </Member>
      {/* {info.userList?.map((value, index) => {
        return <PayChatMemberDiv key={index} info={value}></PayChatMemberDiv>;
      })} */}
    </s.ColumnFlexDiv>
  );
};
