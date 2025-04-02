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
  checked,
}: {
  info: ReadEventsInfoResponse;
  handler: (id: number) => void;
  checked: boolean;
}) => {
  console.log(info.id);
  // QR정산 체크박스의 선택
  console.log(checked);
  const [flag, setFlag] = useState(checked ?? false);

  const controlFlag = () => {
    setFlag(!flag);
    handler(info.id);
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
          <CheckBox checked={true} onClick={controlFlag}></CheckBox>
        ) : (
          <CheckBox checked={false} onClick={controlFlag}></CheckBox>
        )}
      </Member>
    </s.ColumnFlexDiv>
  );
};
