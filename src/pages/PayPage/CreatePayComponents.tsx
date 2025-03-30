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
    </s.ColumnFlexDiv>
  );
};
