import { useState } from "react";

import { ResponseOfRequestedPayInfo } from "@/apis/Pay";
import reactIcon from "@/assets/react.svg";
import { GrayBtn } from "@/pages/PayPage/GrayBtn";
import { addComma } from "@/pages/PayPage/PayPage";
import * as s from "@/pages/PayPage/PayPage.styled";

import "react-toastify/dist/ReactToastify.css";

const ReqDataDiv = ({ data }: { data: ResponseOfRequestedPayInfo }) => {
  // useEffect(() => {
  //   console.log(data);
  // }, []);
  // true : 송금하기 false : 송금완료
  const [chk, setChk] = useState(true);
  const price = addComma(data.requestedAmount);

  return (
    <s.GrayRoundDiv>
      <s.RowFlexDiv style={{ alignItems: "center" }}>
        <img
          src={data.payCreatorProfileImageUrl}
          width={"40px"}
          height={"40px"}
          style={{ marginRight: "0.625rem" }}
          alt="reaction"
        />
        <s.TextDiv>{data.payCreatorName}</s.TextDiv>
        <s.GrayBTextDiv style={{ position: "absolute", right: "0rem", marginRight: "3rem" }}>
          {price}원
        </s.GrayBTextDiv>
      </s.RowFlexDiv>
      <div style={{ width: "100%", display: "flex" }}>
        <GrayBtn style={{ flexGrow: 1, cursor: "default" }}>송금하기</GrayBtn>
      </div>
    </s.GrayRoundDiv>
  );
};

export default ReqDataDiv;
