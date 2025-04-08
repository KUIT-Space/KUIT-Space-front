import { useEffect, useState } from "react";

import { ReadEventInfoResponse, ReadEventsInfoResponse } from "@/apis/event";
import { UserInfoInSpace } from "@/apis/Space/SpaceSearchAllUserApi";
import PlaceholderIcon from "@/assets/KUIT.svg";
import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import * as s from "@/pages/PayPage/PayPage.styled";
import { getUserDefaultImageURL } from "@/utils/getUserDefaultImageURL";

import { ChatUserInfoInSpace } from "./CreateRequestPage";
// interface payChatDivtype {
//   img: string;
//   name: string;
//   cnt: number;
// }

export const PayChatDiv = ({
  info,
  onToggle,
  checked,
}: {
  info: ReadEventsInfoResponse;
  onToggle: (id: number) => void;
  checked: boolean;
}) => {
  // QR정산 체크박스의 선택
  const [flag, setFlag] = useState(checked);

  const handleClick = () => {
    setFlag(!flag);
    onToggle(info.id);
  };
  const onImageErr: React.ReactEventHandler<HTMLImageElement> = (e) => {
    (e.target as HTMLImageElement).src = PlaceholderIcon;
  };
  return (
    <s.ColumnFlexDiv>
      <Member $cursor="default">
        <section>
          <img src={info.image} onError={onImageErr} alt="info img" />
          <span className="name">{info.name}</span>
          <s.CountText className="count">{info.totalNumberOfParticipants}</s.CountText>
        </section>
        {flag ? (
          <CheckBox checked={true} onClick={handleClick}></CheckBox>
        ) : (
          <CheckBox checked={false} onClick={handleClick}></CheckBox>
        )}
      </Member>
    </s.ColumnFlexDiv>
  );
};
