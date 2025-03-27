import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { payCompleteApi } from "@/apis/Pay/PayPageAPI";
import check from "@/assets/PayPage/check.svg";
import reactIcon from "@/assets/react.svg";
import { DarkNormalBtn } from "@/pages/PayPage/DarkNormalBtn";
import { GradientBtn } from "@/pages/PayPage/GradientBtn";
import { NormalBtn } from "@/pages/PayPage/NormalBtn";
import { addComma, PayReceiveInfo } from "@/pages/PayPage/PayPage";
import * as s from "@/pages/PayPage/PayPage.styled";

import "react-toastify/dist/ReactToastify.css";
import { ResponseOfPayRequestInfo, ResponseOfRequestedPayInfo } from "@/apis/Pay";

const ReqDataDiv = ({ data }: { data: ResponseOfRequestedPayInfo }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  // true : 송금하기 false : 송금완료
  const [chk, setChk] = useState(0);
  const price = addComma(data.requestedAmount);

  const nextChk = () => {
    setChk(chk + 1);
    chk % 3;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 계좌번호가 복사되었습니다!", {
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

  const onPayClick = () => {
    nextChk();
    //모달 생성
    //클립보드 복사
    copyToClipboard(data.bankName + " " + data.bankAccountNum);
  };

  const onCompleteClick = () => {
    nextChk();
    payCompleteApi(data.payRequestTargetId);
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
            송금완료
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
        <img
          src={reactIcon}
          width={"40px"}
          height={"40px"}
          style={{ marginRight: "10px" }}
          alt="reaction"
        />
        <s.TextDiv style={{ color: "white" }}>{data.payCreatorName}</s.TextDiv>
        <s.NowPriceDiv style={{ position: "absolute", right: 0, transform: "translate(-60%,0%)" }}>
          {price}원
        </s.NowPriceDiv>
      </s.RowFlexDiv>
      <div style={{ width: "100%", display: "flex" }}>{statusSwitch()}</div>
    </s.RoundDiv>
  );
};

export default ReqDataDiv;
