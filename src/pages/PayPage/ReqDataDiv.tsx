import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ResponseOfRequestedPayInfo, useCompletePay } from "@/apis/Pay";
import { payCompleteApi } from "@/apis/Pay/PayPageAPI";
import check from "@/assets/PayPage/check.svg";
import reactIcon from "@/assets/react.svg";
import { DarkNormalBtn } from "@/pages/PayPage/DarkNormalBtn";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import { NormalBtn } from "@/pages/PayPage/NormalBtn";
import { addComma } from "@/pages/PayPage/PayPage";
import * as s from "@/pages/PayPage/PayPage.styled";

import "react-toastify/dist/ReactToastify.css";
import { SPACE_ID } from "@/utils/constants";
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("클립보드 복사 완료!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (e) {
    alert(e);
  }
};
const ReqDataDiv = ({ data }: { data: ResponseOfRequestedPayInfo }) => {
  const { mutate: completePay } = useCompletePay(SPACE_ID);
  // true : 송금하기 false : 송금완료
  const [chk, setChk] = useState(0);
  const price = addComma(data.requestedAmount);
  console.log(data);

  const nextChk = () => {
    setChk(chk + 1);
    chk % 3;
  };

  const onPayClick = () => {
    nextChk();
    //모달 생성
    //클립보드 복사
    copyToClipboard(data.bankName + " " + data.bankAccountNum);
  };

  const onCompleteClick = () => {
    nextChk();
    completePay(data.payRequestTargetId);
    //모달 생성
    //클립보드 복사
  };

  const statusSwitch = () => {
    switch (chk) {
      case 0:
        return (
          <NormalBtn style={{ flexGrow: 1 }} onClick={onPayClick}>
            송금하기
          </NormalBtn>
        );
      case 1:
        return (
          <GradientBtn style={{ flexGrow: 1 }} onClick={onCompleteClick}>
            송금 완료하기
          </GradientBtn>
        );
      case 2:
        return (
          <DarkNormalBtn
            style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            송금완료
            <img width={"28px"} height={"28px"} src={check} alt="check" />
          </DarkNormalBtn>
        );
    }
  };
  return (
    <s.RoundDiv style={{ marginBottom: "2.75rem" }}>
      <s.RowFlexDiv style={{ alignItems: "center" }}>
        <s.PayInfoWrapper>
          <img
            src={data.payCreatorProfileImageUrl}
            width={"40px"}
            height={"40px"}
            style={{ marginRight: "10px" }}
            alt="reaction"
          />
          <s.TextDiv style={{ color: "white" }}>{data.payCreatorName}</s.TextDiv>
        </s.PayInfoWrapper>

        <s.NowPriceDiv>{price}원</s.NowPriceDiv>
      </s.RowFlexDiv>
      <div style={{ width: "100%", display: "flex" }}>{statusSwitch()}</div>
    </s.RoundDiv>
  );
};

export default ReqDataDiv;
