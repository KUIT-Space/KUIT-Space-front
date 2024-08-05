import CheckBox from "@/components/CheckBox";
import { Member } from "@/pages/ChatPage/ChatCreatePage/ChatCreatePage.styled";
import ReactImg from "@/assets/react.svg";
import { useState } from "react";

interface payChatDivtype {
  img: string;
  name: string;
  cnt: number;
}

export const PayChatDiv = ({ img, name, cnt }: payChatDivtype) => {
  const [flag, setFlag] = useState(false);
  const controlFlag = () => {
    setFlag(!flag);
  };
  return (
    <Member>
      <section>
        <img src={ReactImg} />
        <span className="name">{name}</span>
        <span className="count">{cnt}</span>
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
  );
};
