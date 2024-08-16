import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import ReactImg from "@/assets/react.svg";
import { useState } from "react";

import * as s from "@/pages/PayPage/PayPage.styled";
interface payChatDivtype {
  img: string;
  name: string;
  cnt: number;
}

const PayChatMemberDiv = () => {
  return (
    <s.RowFlexDiv style={{ alignItems: "center" }}>
      <img style={{ width: "2.5rem", height: "2.5rem", marginLeft: "1.875rem" }} src={ReactImg} />
      <span className="name" style={{ marginLeft: "0.75rem" }}>
        시험
      </span>
      <CheckBox></CheckBox>
    </s.RowFlexDiv>
  );
};
export const PayChatDiv = ({ img, name, cnt }: payChatDivtype) => {
  const [flag, setFlag] = useState(false);
  const controlFlag = () => {
    setFlag(!flag);
  };
  return (
    <s.ColumnFlexDiv>
      <Member>
        <section>
          <img src={ReactImg} />
          <span className="name">{name}</span>
          <s.CountText className="count">{cnt}</s.CountText>
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
      <PayChatMemberDiv></PayChatMemberDiv>
    </s.ColumnFlexDiv>
  );
};
